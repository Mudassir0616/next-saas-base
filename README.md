# SaaS Base

A Next.js starter to clone when beginning a new SaaS product. It ships a working
login, a protected app shell, a dashboard with charts and five table screens.
Everything runs on **sample data kept inside the service layer**, so the app
works with no backend, and switching to a real API changes one file per
resource.

- [Quick start](#quick-start)
- [What's included](#whats-included)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Sample data](#sample-data)
- [Going live with a real API](#going-live-with-a-real-api)
- [Adding a new screen](#adding-a-new-screen)
- [Styling and theming](#styling-and-theming)
- [Conventions](#conventions)
- [Known gaps / handover notes](#known-gaps--handover-notes)

---

## Quick start

Requires **Node 18.17+** (Node 20 LTS recommended).

```bash
npm install
npm run dev     # http://localhost:3000
```

Sign in with **admin@example.com** / **password** (or `member@example.com` /
`password`). The accounts are defined at the top of
`src/services/authService.js`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload (JS and SCSS) |
| `npm run build` | Production build; runs ESLint and fails on lint errors |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

There is no test suite yet. `npm run build` is the check to run before you push.

### Environment

| Variable | Used by | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_API_URL` | `src/lib/apiClient.js` | Backend origin. Requests go to `${NEXT_PUBLIC_BASE_API_URL}/api<path>`. Unused while the app runs on sample data. |

`.env` is committed and holds only this non-secret default. Put anything
machine-specific or secret in `.env.local`, which is gitignored. `.env.example`
documents the variables.

---

## What's included

| Route | Screen |
| --- | --- |
| `/` | Login (public navbar + footer) |
| `/dashboard` | KPI cards, revenue / pipeline / plan charts, activity feed, top deals |
| `/customers` | Table with search, sort, pagination and delete confirmation |
| `/deals` `/invoices` `/products` `/team` | Table screens following the same pattern |
| `/settings` | Profile form and light/dark theme picker |
| `/404` | Standalone not-found page (no app shell) |

Plus: light/dark theme with no flash on load, collapsible sidebar (remembered
per browser), mobile drawer, route protection with return-to-page after login,
and toast notifications.

**Stack:** Next.js 14 (Pages Router) · React 18 · JavaScript (no TypeScript) ·
SCSS · MUI (dialogs only) · axios · Chart.js via `react-chartjs-2` ·
`lucide-react` icons · `react-toastify`.

---

## Project structure

```
src/
├── pages/        Routes. Thin: they compose components and define table columns
├── layouts/      PublicLayout (navbar + footer), DashboardLayout (sidebar + topbar + auth guard)
├── components/
│   ├── auth/       LoginForm, ProtectedRoute
│   ├── dashboard/  StatCard and the three charts, ActivityFeed
│   ├── layout/     Sidebar, Topbar, PublicNavbar, PublicFooter
│   └── ui/         DataTable, Badge, Card, Avatar, ConfirmDialog, EmptyState, PageHeader
├── services/     The data layer: the only code that knows where data comes from
│   ├── *Service.js   one per resource: sample data at the top, then the functions
│   ├── endpoints.js  pre-configured ApiClient per resource (used once live)
│   └── mockClient.js fake transport for the sample data (delete when live)
├── hooks/        useTable (pagination/search/sort), useDebouncedValue
├── context/      AuthContext (session), ThemeContext (light/dark)
├── lib/          apiClient (axios wrapper), formatters, Chart.js + MUI theme setup
├── config/       site.js (product name, page size), navigation.js (sidebar)
└── styles/       globals.scss: the only stylesheet
```

Import paths use the `@/` alias for `src/` (configured in `jsconfig.json`).

---

## Architecture

### 1. Layers and the one rule

```
 pages/  ──▶  components/            UI only; never fetches by itself
   │
   │  calls a function such as listCustomers(params)
   ▼
 services/*Service.js                  the seam
   ├── today:  sample data → mockClient (filter, sort, paginate, fake latency)
   └── later:  endpoints.js → lib/apiClient (axios) → your backend
```

**Pages and components only ever call service functions.** They never hold
data and never call axios directly. The service is the single place that decides
where data comes from, which is why going live (or changing backends) touches
`src/services/` and nothing else.

Both paths return **the same shape**. List calls resolve to a DRF-style
envelope:

```json
{ "count": 15, "next": 2, "previous": null, "results": [ ... ] }
```

and single-record calls resolve to the record itself. If your backend paginates
differently, translate it inside the service function, not in components.

### 2. How a table screen loads data

```
CustomersPage
  └─ useTable(listCustomers, { ordering: "-createdAt" })
        state: page, search (debounced 350 ms), ordering
        └─ listCustomers({ page, pageSize, search, ordering, filters })
              └─ mockList(SAMPLE_CUSTOMERS, params)     ← or customersApi.get("/", params)
  └─ <DataTable rows={table.rows} … onSort={table.toggleSort} />
```

`useTable` owns pagination, debounced search and sort toggling, and drops stale
responses when requests overlap (a request-id counter: only the newest request
may update state). Changing the search or filters resets to page 1. A sortable
column's `key` is sent as `ordering` (`"name"` or `"-name"`), so it must match a
real field on the record.

### 3. API client (once live)

`src/lib/apiClient.js` wraps axios; `src/services/endpoints.js` creates one
instance per resource (`new ApiClient({ path: "/customers" })`). It:

- adds `Authorization: Bearer <token>` from the `access_token` cookie (skip with `auth: false`);
- resolves to `response.data`, so callers get the body, just like the mocks;
- **shows a toast for every failed request** using the server's message (DRF
  `detail` and field errors understood), so callers only `catch` to reset UI
  state and should not show a second toast;
- on **401**, clears the session cookies and redirects to `/`.

### 4. Authentication

```
LoginForm ─▶ AuthContext.login() ─▶ authService.login()
                 │  stores access/refresh token in cookies
                 │  caches the profile in localStorage("auth_user")
                 ▼
   Login page sees isAuthenticated ─▶ redirects to ?next=… (same-origin only) or /dashboard

Any page in DashboardLayout ─▶ ProtectedRoute
   loading?          → spinner
   not signed in?    → redirect to /?next=<current path>
```

- `AuthContext` exposes `user`, `loading`, `isAuthenticated`, `login`, `logout`
  and `updateUser`.
- The token is in a **cookie** so the API client can read it. The profile is
  cached in **localStorage** so a page refresh doesn't flash the login screen.
  On boot the user is restored only if **both** exist. `logout()` clears both.
- `login()` only authenticates. The login page decides where to go next, so
  there is one redirect rule.

### 5. Layouts

Pages choose their shell with a `getLayout` static. `_app.js` doesn't hard-code
one:

```jsx
CustomersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
```

`DashboardLayout` already includes `ProtectedRoute`, so pages inside it need no
auth check of their own. A page without `getLayout` renders bare (that's how
`/404` avoids the shell). `_app.js` only sets up providers, in this order:
ThemeProvider → MUI theme → AuthProvider → toast container.

### 6. Rendering model

Every route is statically pre-rendered at build time. Data is fetched in the
browser after the page loads (via `useTable` / `useEffect`); there is no
`getServerSideProps`, so the Next server never needs to reach your API. Serve it
with `npm run build && npm run start`.

---

## Sample data

Each service file keeps its sample data at the top, next to the functions
that use it:

| File | Sample data |
| --- | --- |
| `src/services/authService.js` | `DEMO_USERS`: accounts the login accepts |
| `src/services/customersService.js` | `SAMPLE_CUSTOMERS` (15 rows) |
| `src/services/dealsService.js` | `SAMPLE_DEALS` (12 rows) |
| `src/services/invoicesService.js` | `SAMPLE_INVOICES` (12 rows) |
| `src/services/productsService.js` | `SAMPLE_PRODUCTS` (12 rows) |
| `src/services/teamService.js` | `SAMPLE_TEAM` (11 rows) |
| `src/services/dashboardService.js` | `SAMPLE_DASHBOARD`: one summary object (stats, chart series, activity, top deals) |

To change what the app shows, edit those rows. Dates are written as
`daysAgo(12)` / `daysAhead(5)` (from `mockClient.js`) so they stay relative to
today and labels like "3h ago" never go stale.

`mockClient.js` provides the fake transport:

- `mockList(rows, params, { searchFields })`: search, exact-match filters,
  sort and paginate in memory, returning the list envelope;
- `mockOne(rows, id)`: find one record or throw a 404-style error;
- `mockMutate(payload)`: resolve after a delay. **Changes are not saved**: a
  deleted row reappears on the next fetch. This is expected in demo mode.

---

## Going live with a real API

Every service function already has its real call written above the mock one,
commented out:

```js
export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(SAMPLE_CUSTOMERS, params, { searchFields: ["name", "email", "company", "country"] });
```

1. Set `NEXT_PUBLIC_BASE_API_URL` in `.env.local` (or your host's environment).
2. In a service file: uncomment the `import { …Api } from "./endpoints"` line,
   uncomment each real call and delete the `mock*` line beneath it.
3. Delete the `SAMPLE_*` block at the top of that file.
4. For auth, also replace the localStorage-only rehydration in
   `src/context/AuthContext.jsx` with `authService.getCurrentUser()` so the
   token is checked on each page load (the comment there marks the spot).
5. When no service imports from `mockClient.js` any more, delete it.

Expected endpoints (relative to `${NEXT_PUBLIC_BASE_API_URL}/api`):

| Resource | Endpoints |
| --- | --- |
| Auth | `POST /auth/token/` → `{ user, access, refresh }` · `POST /auth/logout/` · `GET`/`PATCH /auth/me/` |
| Customers, deals, products | `GET /<resource>/` (list) · `GET /<resource>/:id/` · `POST /<resource>/` · `PATCH`/`DELETE /<resource>/:id/` |
| Invoices | `GET /invoices/` · `GET /invoices/:id/` · `DELETE /invoices/:id/` |
| Team | `GET /team/` · `POST /team/invite/` · `DELETE /team/:id/` |
| Dashboard | `GET /dashboard/summary/` → same shape as `SAMPLE_DASHBOARD` |

List endpoints receive `page`, `pageSize`, `search` and `ordering` as query
params. `filters` is an object, which axios sends as `filters[field]=value`.
Flatten or rename these in the service if your backend expects something else.

---

## Adding a new screen

1. **Service**: create `src/services/thingsService.js` following the shape of
   `customersService.js`: a `SAMPLE_THINGS` array, then
   `listThings = (params) => mockList(SAMPLE_THINGS, params, { searchFields: [...] })`
   with the real call commented above it. Add `thingsApi` to `endpoints.js`.
2. **Navigation**: add `{ label, href, icon }` to a section's `items` in
   `src/config/navigation.js` (icons from `lucide-react`); the sidebar renders
   from it.
3. **Page**: create `src/pages/things/index.js`:

```jsx
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import useTable from "@/hooks/useTable";
import { formatDate } from "@/lib/format";
import { listThings } from "@/services/thingsService";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "createdAt", label: "Created", sortable: true, render: (row) => formatDate(row.createdAt) },
];

export default function ThingsPage() {
  const table = useTable(listThings, { ordering: "-createdAt" });

  return (
    <>
      <PageHeader title="Things" />
      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
      />
    </>
  );
}

ThingsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
```

Status columns can use `<Badge value={row.status} />`; add new status values
to the tone map in `src/components/ui/Badge.jsx`.

---

## Styling and theming

All styles live in **`src/styles/globals.scss`**, compiled by Next itself (the
`sass` dev dependency); `npm run dev` hot-reloads it. There are no CSS modules,
no Tailwind and no generated `.css` file. The file is ordered: Sass helpers →
design tokens → base → one section per component.

```scss
.thing {
  padding: 24px;
  @include below($bp-lg) { padding: 16px; }   // $bp-sm / $bp-md / $bp-lg / $bp-xl
  @include truncate;
}
```

**Colours, spacing and radii are CSS custom properties, not Sass variables**,
on purpose: the theme toggle swaps them at runtime by setting `data-theme` on
`<html>`, which a compile-time `$variable` can't do. Converting them to `$vars`
would break dark mode. Use `@include dark { … }` only when a variable can't
express the change.

- **Rebrand:** change the `--brand-*` tokens. MUI dialogs follow automatically
  via `src/lib/muiTheme.js`, and charts via `chartTheme(isDark)` in
  `src/lib/chartSetup.js`.
- **No flash on load:** an inline script in `src/pages/_document.js` applies the
  saved (or system) theme before the first paint; `ThemeContext` handles
  toggling and saves the choice in localStorage.
- **VS Code:** Live Sass Compiler is disabled for this workspace in
  `.vscode/settings.json` so it can't drop a stray `globals.css` next to the
  `.scss` (and `src/styles/*.css` is gitignored as a backstop).

---

## Conventions

- **Product name, description and page size:** `src/config/site.js`.
- **Pages stay thin:** composition and column definitions only; data access
  lives in services, state logic in hooks.
- **Icons:** `lucide-react`. **Dialogs:** MUI (`ConfirmDialog`). **Toasts:**
  `react-toastify`.
- **Formatting:** `formatCurrency`, `formatNumber`, `formatDate`,
  `formatRelativeTime` in `src/lib/format.js`.
- **Charts:** Chart.js parts are registered once in `src/lib/chartSetup.js`
  (imported by `_app.js`), so don't register them again in components.

---

## Known gaps / handover notes

Things the template deliberately leaves for the product to decide:

- **No automated tests.** Lint and build are the only checks.
- **Sample-data mode:** create/update/delete calls don't save, and the
  Add / Invite / Export buttons only show a placeholder toast.
- **Token refresh:** the refresh token is stored but never used. A 401 simply
  signs the user out. Add a refresh step in `lib/apiClient.js` if your backend
  issues short-lived tokens.
- **Session check on load:** while on sample data, a page refresh trusts the
  cached profile without asking the server (see step 4 of going live).
- **Roles:** `ProtectedRoute` accepts a `roles` array (redirecting to
  `/dashboard` when the user's role isn't listed), but no screen uses it yet.
- **Search is sent to the server** (after a 350 ms debounce), so backends
  should support `search` on list endpoints.
