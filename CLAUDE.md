# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **template**, not a product. It gets cloned as the starting point for new SaaS
applications. Favour generic, reusable solutions over anything specific to one
product domain, and keep the demo surface small enough to delete easily.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (also runs lint + fails on lint errors)
- `npm run start` — serve the production build
- `npm run lint` — `next lint` (`.eslintrc.json` extends `next/core-web-vitals`)

No test suite is configured. **Node 18.17+ is required**; `node -v` on this
machine may report an older default, so use a newer version from `~/.nvm` when
building.

## Stack

Next.js 14 **Pages Router**, JavaScript (no TypeScript). `@/*` → `src/*`
(`jsconfig.json`). Plain CSS with custom properties for styling; MUI only for
dialogs; `lucide-react` for icons; `chart.js` via `react-chartjs-2`.

## The layering rule

Data flows **`src/mock/` → `src/services/` → pages/components**.

Pages and components must **never** import from `src/mock/` directly. Only
`src/services/` knows where data comes from. This is what makes the mock→API
swap a one-layer change, and it is the single most important constraint here —
check it before adding any data-fetching code.

Each service function has its real API call written directly above the mock one,
commented out:

```js
export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(customers, params, { searchFields: ["name", "email", "company"] });
```

When adding a service, follow that shape. Mock list responses use the DRF-style
envelope `{ count, next, previous, results }` so components are agnostic to the
swap. `src/mock/README.md` documents the removal steps.

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

`ProtectedRoute` redirects unauthenticated users to `/?next=<path>`; the login
page at `/` reads `next` and returns them there. It renders a spinner rather than
`null` while `loading` is true, so don't add a second loading gate on top.

## Adding a screen

1. Data in `src/mock/`, a service in `src/services/`.
2. Route entry in `src/config/navigation.js` (drives the sidebar).
3. Page using `useTable` + `DataTable`, with `getLayout` set.

`useTable(fetcher, { ordering, pageSize, filters })` owns pagination, debounced
search and sorting, and guards against stale overlapping responses with a
request-id counter. A sortable column's `key` is sent to the API as `ordering`,
so it must match a real field name on the record or sorting silently no-ops.

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
