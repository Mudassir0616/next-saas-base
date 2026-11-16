import { daysAgo, mockList, mockMutate, mockOne } from "./mockClient";
// import { productsApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
// status is one of "in_stock" | "low_stock" | "out_of_stock".
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Pipeline Automation", sku: "SKU-1000", category: "Automation", price: 199, stock: 240, status: "in_stock", updatedAt: daysAgo(2) },
  { id: 2, name: "Lead Scoring", sku: "SKU-1007", category: "Analytics", price: 149, stock: 32, status: "low_stock", updatedAt: daysAgo(5) },
  { id: 3, name: "Email Sequencer", sku: "SKU-1014", category: "Automation", price: 79, stock: 180, status: "in_stock", updatedAt: daysAgo(11) },
  { id: 4, name: "Call Recording", sku: "SKU-1021", category: "Integrations", price: 59, stock: 0, status: "out_of_stock", updatedAt: daysAgo(30) },
  { id: 5, name: "Revenue Forecast", sku: "SKU-1028", category: "Analytics", price: 299, stock: 96, status: "in_stock", updatedAt: daysAgo(7) },
  { id: 6, name: "Contract Builder", sku: "SKU-1035", category: "Billing", price: 129, stock: 18, status: "low_stock", updatedAt: daysAgo(14) },
  { id: 7, name: "Quote Generator", sku: "SKU-1042", category: "Billing", price: 89, stock: 310, status: "in_stock", updatedAt: daysAgo(1) },
  { id: 8, name: "Data Enrichment", sku: "SKU-1049", category: "Integrations", price: 249, stock: 140, status: "in_stock", updatedAt: daysAgo(21) },
  { id: 9, name: "Churn Predictor", sku: "SKU-1056", category: "Analytics", price: 399, stock: 0, status: "out_of_stock", updatedAt: daysAgo(45) },
  { id: 10, name: "Audit Trail", sku: "SKU-1063", category: "Security", price: 99, stock: 205, status: "in_stock", updatedAt: daysAgo(9) },
  { id: 11, name: "SSO & SCIM", sku: "SKU-1070", category: "Security", price: 499, stock: 64, status: "in_stock", updatedAt: daysAgo(3) },
  { id: 12, name: "Slack Sync", sku: "SKU-1077", category: "Integrations", price: 29, stock: 12, status: "low_stock", updatedAt: daysAgo(60) },
];

export const listProducts = (params) =>
  // productsApi.get("/", params);
  mockList(SAMPLE_PRODUCTS, params, { searchFields: ["name", "sku", "category"] });

export const getProduct = (id) =>
  // productsApi.get(`/${id}/`);
  mockOne(SAMPLE_PRODUCTS, id);

export const createProduct = (payload) =>
  // productsApi.post("/", payload);
  mockMutate(payload);

export const updateProduct = (id, payload) =>
  // productsApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteProduct = (id) =>
  // productsApi.delete(`/${id}/`);
  mockMutate({ id });
