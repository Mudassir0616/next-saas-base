import { daysAgo, mockList, mockMutate, mockOne } from "./mockClient";
// import { customersApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
const SAMPLE_CUSTOMERS = [
  { id: 1, name: "Amara Okafor", email: "amara@northwindlabs.com", company: "Northwind Labs", plan: "Enterprise", status: "active", country: "United States", mrr: 4200, createdAt: daysAgo(410) },
  { id: 2, name: "Noah Bennett", email: "noah@brightpath.com", company: "Brightpath", plan: "Growth", status: "active", country: "Canada", mrr: 890, createdAt: daysAgo(220) },
  { id: 3, name: "Priya Raman", email: "priya@lumenworks.com", company: "Lumen Works", plan: "Scale", status: "trial", country: "India", mrr: 0, createdAt: daysAgo(6) },
  { id: 4, name: "Liam Novak", email: "liam@kestrelgroup.com", company: "Kestrel Group", plan: "Starter", status: "churned", country: "Germany", mrr: 0, createdAt: daysAgo(380) },
  { id: 5, name: "Sofia Alvarez", email: "sofia@auravia.com", company: "Auravia", plan: "Growth", status: "active", country: "Spain", mrr: 1150, createdAt: daysAgo(145) },
  { id: 6, name: "Mei Chen", email: "mei@velasystems.com", company: "Vela Systems", plan: "Enterprise", status: "active", country: "Japan", mrr: 3800, createdAt: daysAgo(510) },
  { id: 7, name: "Lucas Duarte", email: "lucas@corterra.com", company: "Corterra", plan: "Starter", status: "lead", country: "Brazil", mrr: 0, createdAt: daysAgo(2) },
  { id: 8, name: "Zara Haddad", email: "zara@halcyondata.com", company: "Halcyon Data", plan: "Scale", status: "active", country: "United States", mrr: 2400, createdAt: daysAgo(300) },
  { id: 9, name: "Oliver Lindqvist", email: "oliver@tidewater.co", company: "Tidewater Co", plan: "Growth", status: "trial", country: "Canada", mrr: 0, createdAt: daysAgo(11) },
  { id: 10, name: "Ines Moreau", email: "ines@quillon.com", company: "Quillon", plan: "Starter", status: "active", country: "Spain", mrr: 149, createdAt: daysAgo(90) },
  { id: 11, name: "Mateo Castillo", email: "mateo@fernbrook.com", company: "Fernbrook", plan: "Scale", status: "active", country: "Brazil", mrr: 2100, createdAt: daysAgo(260) },
  { id: 12, name: "Aisha Karim", email: "aisha@sableridge.com", company: "Sable Ridge", plan: "Enterprise", status: "lead", country: "Kenya", mrr: 0, createdAt: daysAgo(4) },
  { id: 13, name: "Hugo Vogel", email: "hugo@pinecrest.com", company: "Pinecrest", plan: "Growth", status: "churned", country: "Germany", mrr: 0, createdAt: daysAgo(330) },
  { id: 14, name: "Yuki Tanaka", email: "yuki@meridianbay.com", company: "Meridian Bay", plan: "Starter", status: "active", country: "Japan", mrr: 99, createdAt: daysAgo(40) },
  { id: 15, name: "Elena Petrova", email: "elena@ironleaf.com", company: "Ironleaf", plan: "Scale", status: "active", country: "India", mrr: 1890, createdAt: daysAgo(175) },
];

export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(SAMPLE_CUSTOMERS, params, { searchFields: ["name", "email", "company", "country"] });

export const getCustomer = (id) =>
  // customersApi.get(`/${id}/`);
  mockOne(SAMPLE_CUSTOMERS, id);

export const createCustomer = (payload) =>
  // customersApi.post("/", payload);
  mockMutate(payload);

export const updateCustomer = (id, payload) =>
  // customersApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteCustomer = (id) =>
  // customersApi.delete(`/${id}/`);
  mockMutate({ id });
