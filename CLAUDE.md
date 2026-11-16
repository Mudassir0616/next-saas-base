# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **template**, not a product. It gets cloned as the starting point for new SaaS
applications. Favour generic, reusable solutions over anything specific to one
product domain, and keep the demo surface small enough to delete easily.
`README.md` is the human-facing handover doc (architecture diagrams, endpoint
table, going-live steps); keep it in sync when behaviour described there changes.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (also runs lint + fails on lint errors)
- `npm run start` — serve the production build
- `npm run lint` — `next lint` (`.eslintrc.json` extends `next/core-web-vitals`)

No test suite is configured; `npm run build` (lint + compile + static prerender
of every route) is the verification step. **Node 18.17+ is required**; `node -v`
on this machine may report an older default, so put a newer one from `~/.nvm`
first on `PATH` (e.g. `export PATH=~/.nvm/versions/node/v20.19.4/bin:$PATH`).

Demo login: `admin@example.com` / `password` (`DEMO_USERS` in
`src/services/authService.js`).

`.env` is committed and holds only the non-secret `NEXT_PUBLIC_BASE_API_URL`;
anything secret goes in `.env.local` (gitignored).

## Stack

Next.js 14 **Pages Router**, JavaScript (no TypeScript). `@/*` → `src/*`
(`jsconfig.json`). SCSS with CSS custom properties for styling; MUI only for
dialogs; `lucide-react` for icons; `chart.js` via `react-chartjs-2`. Every route
is statically prerendered and fetches data client-side — there is no
`getServerSideProps`.

## The layering rule

Data flows **`src/services/` → pages/components**. Pages and components must
**never** hold sample data or call axios/`ApiClient` directly — they only call
service functions. Only `src/services/` knows where data comes from, which is
what makes the sample→API swap a one-file-per-resource change. This is the
single most important constraint here; check it before adding data-fetching code.

Each `*Service.js` is self-contained: a `SAMPLE_*` constant at the top (hand-
written rows; `DEMO_USERS` in `authService.js`, a single `SAMPLE_DASHBOARD`
summary object in `dashboardService.js`), then functions with the real API call
written directly above the mock one, commented out:

```js
export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(SAMPLE_CUSTOMERS, params, { searchFields: ["name", "email", "company", "country"] });
```

When adding a service, follow that shape. Don't reintroduce a separate mock
folder, generators, or cross-service imports of sample data — the dashboard
summary is deliberately its own static object, mirroring one
`/dashboard/summary/` response. If you edit sample rows, the dashboard's totals
were hand-derived from them (active-customer MRR, open pipeline, paid invoices,
per-stage/per-plan sums) and should be kept consistent.

Mock side (`src/services/mockClient.js`, deleted when going live):
- `mockList` returns the DRF-style envelope `{ count, next, previous, results }`
  so components are agnostic to the swap; `mockOne` throws a `status: 404`
  error; both add fake latency.
- `mockMutate` does **not** persist — a "deleted" row reappears after
  `table.refresh()`. That is expected, not a bug.
- Write sample dates as `daysAgo(n)` / `daysAhead(n)` (fractions allowed) so
  relative labels stay current; never hard-code ISO strings or use `Math.random()`.

Real-API side:
- One `ApiClient` instance per resource is pre-built in
  `src/services/endpoints.js`; requests go to
  `${NEXT_PUBLIC_BASE_API_URL}/api<path>` with DRF-style trailing slashes.
- `src/lib/apiClient.js`'s response interceptor returns `response.data`, so real
  calls resolve to the body exactly as the mocks do.
- The error interceptor **already toasts** the server message (DRF field errors
  included) and, on 401, clears the session cookies and hard-redirects to `/`.
  Callers should `catch` only to restore UI state — don't toast errors again.
- The refresh token is stored but no refresh flow exists yet.

## Layout system

Pages opt into a shell via the **`getLayout` static**, not via `_app.js`:

```jsx
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
```

`_app.js` only wires providers (theme → MUI → auth → toasts) and calls
`Component.getLayout`. A page without `getLayout` renders bare — that is how
`/404` escapes the app shell. `DashboardLayout` already wraps `ProtectedRoute`,
so pages inside it don't need their own auth check.

## Auth

`src/context/AuthContext.jsx` owns `user`, `loading`, `isAuthenticated`, `login`,
`logout`, `updateUser`. The access token is stored in a **cookie** (so
`ApiClient`'s request interceptor can read it) while the user profile is cached
in `localStorage` under `auth_user` to avoid a login flash on refresh — both must
be cleared together on logout.

Boot rehydration restores `user` only when **both** the cookie token and the
cached profile exist (it doesn't call the API yet — the comment in
`AuthContext` says where to swap in `authService.getCurrentUser()`).
`login()` only authenticates; the login page owns the post-login redirect and
only accepts same-origin `next` values (`safeRedirect` in `src/pages/index.js`).

`ProtectedRoute` redirects unauthenticated users to `/?next=<path>`. It renders
a spinner rather than `null` while `loading` is true, so don't add a second
loading gate on top. It also accepts an optional `roles` array (redirecting to
`/dashboard` when `user.role` isn't in it), though `DashboardLayout` doesn't
pass one today.

## Adding a screen

1. A service in `src/services/` with its `SAMPLE_*` rows, plus an `ApiClient`
   entry in `endpoints.js`.
2. Route entry in a section's `items` in `src/config/navigation.js` (drives the sidebar).
3. Page using `useTable` + `DataTable`, with `getLayout` set.

`useTable(fetcher, { ordering, pageSize, filters })` owns pagination, debounced
search and sorting, and guards against stale overlapping responses with a
request-id counter. A sortable column's `key` is sent to the API as `ordering`,
so it must match a real field name on the record or sorting silently no-ops.
New status values need a tone in `src/components/ui/Badge.jsx`'s map.

## Styling

`src/styles/globals.scss` is the **only** stylesheet. Next compiles it directly
(via the `sass` dev dependency) — it is imported as `.scss` in `_app.js`, and no
generated `.css` is committed. Live Sass Compiler is deliberately disabled for
this workspace in `.vscode/settings.json` so it can't emit a competing file;
`/src/styles/*.css` is gitignored as a backstop.

Structure: Sass helpers (`$bp-*` breakpoints, `below()`/`above()`/`dark()`/
`truncate()` mixins) at the top, then design tokens, then component sections.
Use `@include below($bp-lg) { ... }` nested inside a block rather than writing a
bare `@media`.

Design tokens are **CSS custom properties, not Sass variables** — the dark theme
swaps them at runtime via `data-theme` on `<html>`, which a compile-time Sass
variable cannot do. Don't "simplify" them into `$vars`; that silently breaks
theming. Rebranding means changing `--brand-*`.

Theme is applied pre-paint by an inline script in `_document.js` and toggled
through `ThemeContext`; `src/lib/muiTheme.js` mirrors the same palette into MUI
so dialogs match. Don't add a second styling system (CSS modules, Tailwind)
without changing this note.

## Conventions

- Product name and page size live in `src/config/site.js`.
- Chart.js components are registered once in `src/lib/chartSetup.js`, imported
  for side effects by `_app.js`; chart colours come from `chartTheme(isDark)`.
- Pages are thin — composition and column definitions only, no fetch logic.
