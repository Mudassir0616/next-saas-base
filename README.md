# SaaS Base

A Next.js starter to clone when beginning a new SaaS product. It ships a working
login, a protected CRM shell, a dashboard with charts, and five table screens —
all running on mock data behind a service layer you swap for real API calls.

```bash
npm install
npm run dev     # http://localhost:3000
```

Sign in with **admin@example.com** / **password** (see `src/mock/users.js`).

> Requires Node 18.17+.

## What you get

| Route | Description |
| --- | --- |
| `/` | Login form with public navbar + footer |
| `/dashboard` | KPI cards, revenue/pipeline/plan charts, activity feed |
| `/customers` | Table with search, sort, pagination, delete confirmation |
| `/deals` `/invoices` `/products` `/team` | Table screens following the same pattern |
| `/settings` | Profile form and theme picker |

Plus: light/dark theme with no flash on load, collapsible sidebar, mobile
drawer, route protection, and toast notifications.

## Architecture

```
src/
├── mock/         all dummy data — delete this folder when the API is ready
├── services/     the seam: every data call goes through here
├── lib/          apiClient (axios), formatters, chart + MUI theme setup
├── config/       site metadata, sidebar navigation
├── context/      AuthContext, ThemeContext
├── layouts/      PublicLayout (navbar+footer), DashboardLayout (sidebar+topbar)
├── components/   auth/ dashboard/ layout/ ui/
├── hooks/        useTable, useDebouncedValue
├── pages/        thin route files — they compose components, no data logic
└── styles/       globals.css (design tokens + all styling)
```

**The one rule:** pages and components never import from `src/mock/`. They call
a function in `src/services/`. That is the only layer that knows where data
comes from, so swapping to a real backend touches nothing else.

## Going live with a real API

Each service function already has its real implementation written above the mock
one, commented out:

```js
export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(customers, params, { searchFields: ["name", "email", "company"] });
```

1. Set `NEXT_PUBLIC_BASE_API_URL` in `.env`.
2. Uncomment the `api.*` line, delete the `mock*` line, uncomment the import at
   the top of the file.
3. When every service is switched over, delete `src/mock/` and
   `src/services/mockClient.js`.

Mock list responses use the DRF-style envelope
`{ count, next, previous, results }`, so components do not change during the
swap. If your backend paginates differently, adapt it inside the service
function.

## Adding a new table screen

1. Add the data source in `src/mock/` and a service in `src/services/`.
2. Add the route to `src/config/navigation.js` to get a sidebar entry.
3. Create the page:

```jsx
export default function ThingsPage() {
  const table = useTable(listThings, { ordering: "-createdAt" });

  return (
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
  );
}

ThingsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
```

`useTable` owns pagination, debounced search and sorting, and ignores stale
responses when requests overlap. A sortable column's `key` must match a field
name on the record, since it is sent to the API as `ordering`.

## Styling

All styles live in **`src/styles/globals.scss`** — write SCSS there and
`npm run dev` hot-reloads it. Next compiles the file itself via the `sass`
package, so you don't need to run Live Sass Compiler, and no generated `.css`
is committed.

> Live Sass Compiler is switched off for this workspace in
> `.vscode/settings.json` — otherwise it would drop a `globals.css` next to the
> `.scss` that nothing imports, which is an easy file to edit by mistake. That
> file has a comment explaining how to hand compilation back to the extension.

Helpers are defined at the top of the file:

```scss
.thing {
  padding: 24px;

  @include below($bp-lg) { padding: 16px; }   // $bp-sm / $bp-md / $bp-lg / $bp-xl
  @include truncate;
}
```

Colours, spacing and radii are **CSS custom properties**, not Sass variables:

```scss
:root        { --brand-600: #4f46e5; --surface: #ffffff; }
[data-theme="dark"] { --surface: #131826; }
```

That is deliberate — the theme toggle swaps them at runtime by setting
`data-theme` on `<html>`. A Sass variable is resolved at build time and can't be
re-themed in the browser, so converting these to `$vars` would break dark mode.
Use `@include dark { ... }` for the rare case a variable can't express the
change.

## Conventions

- **Layouts** are opted into per page via `Page.getLayout`. Pages without it
  render bare — that is how `/404` avoids the app shell.
- **Auth** lives in `AuthContext`. The token goes in a cookie (so `ApiClient`
  can read it) and the profile is cached in `localStorage` to avoid a login
  flash on refresh. `ProtectedRoute` wraps `DashboardLayout`.
- **Styling** is SCSS in `src/styles/globals.scss` (the only stylesheet). Change
  `--brand-*` to rebrand. MUI is used only for dialogs and reads the same palette
  via `src/lib/muiTheme.js`.
- **Icons** come from `lucide-react`.

## Renaming the app

`src/config/site.js` holds the product name shown in the sidebar, navbar, footer
and page title.
