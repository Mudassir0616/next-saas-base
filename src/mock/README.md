# Mock data

Every hard-coded record in the app lives in this folder. Nothing outside
`src/services/` imports from here — pages and components only ever call a
service function, so the swap to a real backend touches one layer.

## Replacing this with a real API

1. Open a file in `src/services/`. Each function has the real implementation
   already written directly above the mock one, commented out. For example in
   `customersService.js`:

   ```js
   export const listCustomers = (params) =>
     // return api.get("/", params);
     mockList(customers, params, { searchFields: ["name", "email", "company"] });
   ```

   Uncomment the `api.get` line, delete the `mockList` line.

2. Point `NEXT_PUBLIC_BASE_API_URL` at your backend in `.env`.

3. Once every service is switched over, delete this folder plus
   `src/services/mockClient.js`. Nothing else references them.

## Response shape

`mockList` returns the DRF-style envelope the real API is expected to use, so
components do not change when the swap happens:

```json
{ "count": 48, "next": 2, "previous": null, "results": [] }
```

If your backend paginates differently, adapt it once inside the service
function rather than in each component.
