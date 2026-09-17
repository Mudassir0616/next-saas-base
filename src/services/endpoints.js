import ApiClient from "@/lib/apiClient";

/**
 * Real API clients, configured and ready. They are unused while the services in
 * this folder return mock data — uncomment the `api.*` calls there to go live.
 */
export const authApi = new ApiClient({ path: "/auth", auth: false });
export const customersApi = new ApiClient({ path: "/customers" });
export const dealsApi = new ApiClient({ path: "/deals" });
export const invoicesApi = new ApiClient({ path: "/invoices" });
export const productsApi = new ApiClient({ path: "/products" });
export const teamApi = new ApiClient({ path: "/team" });
export const dashboardApi = new ApiClient({ path: "/dashboard" });
