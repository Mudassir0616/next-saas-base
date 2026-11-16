import { daysAgo, daysAhead, mockList, mockMutate, mockOne } from "./mockClient";
// import { invoicesApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
const SAMPLE_INVOICES = [
  { id: 1, number: "INV-2462", company: "Northwind Labs", amount: 12600, status: "paid", method: "Wire", issuedAt: daysAgo(3), dueAt: daysAhead(27) },
  { id: 2, number: "INV-2461", company: "Vela Systems", amount: 11400, status: "pending", method: "Bank transfer", issuedAt: daysAgo(6), dueAt: daysAhead(24) },
  { id: 3, number: "INV-2460", company: "Halcyon Data", amount: 7200, status: "paid", method: "Card", issuedAt: daysAgo(12), dueAt: daysAhead(18) },
  { id: 4, number: "INV-2459", company: "Fernbrook", amount: 6300, status: "overdue", method: "ACH", issuedAt: daysAgo(48), dueAt: daysAgo(18) },
  { id: 5, number: "INV-2458", company: "Ironleaf", amount: 5670, status: "paid", method: "Card", issuedAt: daysAgo(20), dueAt: daysAhead(10) },
  { id: 6, number: "INV-2457", company: "Auravia", amount: 3450, status: "draft", method: "Bank transfer", issuedAt: daysAgo(1), dueAt: daysAhead(30) },
  { id: 7, number: "INV-2456", company: "Brightpath", amount: 2670, status: "paid", method: "Card", issuedAt: daysAgo(33), dueAt: daysAgo(3) },
  { id: 8, number: "INV-2455", company: "Kestrel Group", amount: 2400, status: "overdue", method: "Wire", issuedAt: daysAgo(62), dueAt: daysAgo(32) },
  { id: 9, number: "INV-2454", company: "Quillon", amount: 447, status: "pending", method: "Card", issuedAt: daysAgo(9), dueAt: daysAhead(21) },
  { id: 10, number: "INV-2453", company: "Meridian Bay", amount: 297, status: "paid", method: "ACH", issuedAt: daysAgo(41), dueAt: daysAgo(11) },
  { id: 11, number: "INV-2452", company: "Sable Ridge", amount: 18900, status: "draft", method: "Wire", issuedAt: daysAgo(2), dueAt: daysAhead(45) },
  { id: 12, number: "INV-2451", company: "Pinecrest", amount: 1340, status: "overdue", method: "Bank transfer", issuedAt: daysAgo(75), dueAt: daysAgo(45) },
];

export const listInvoices = (params) =>
  // invoicesApi.get("/", params);
  mockList(SAMPLE_INVOICES, params, { searchFields: ["number", "company", "status", "method"] });

export const getInvoice = (id) =>
  // invoicesApi.get(`/${id}/`);
  mockOne(SAMPLE_INVOICES, id);

export const deleteInvoice = (id) =>
  // invoicesApi.delete(`/${id}/`);
  mockMutate({ id });
