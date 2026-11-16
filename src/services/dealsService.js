import { daysAgo, daysAhead, mockList, mockMutate, mockOne } from "./mockClient";
// import { dealsApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
const SAMPLE_DEALS = [
  { id: 1, title: "Northwind Labs — Annual renewal", company: "Northwind Labs", owner: "Alex Morgan", stage: "Negotiation", value: 168000, probability: 75, expectedCloseAt: daysAhead(12) },
  { id: 2, title: "Vela Systems — Platform upgrade", company: "Vela Systems", owner: "Sam Rivera", stage: "Proposal", value: 142000, probability: 50, expectedCloseAt: daysAhead(34) },
  { id: 3, title: "Halcyon Data — Seat expansion", company: "Halcyon Data", owner: "Maya Larsen", stage: "Won", value: 96000, probability: 100, expectedCloseAt: daysAgo(8) },
  { id: 4, title: "Sable Ridge — Pilot rollout", company: "Sable Ridge", owner: "Alex Morgan", stage: "Qualified", value: 88000, probability: 25, expectedCloseAt: daysAhead(70) },
  { id: 5, title: "Fernbrook — Migration", company: "Fernbrook", owner: "Theo Papadakis", stage: "Negotiation", value: 72500, probability: 80, expectedCloseAt: daysAhead(9) },
  { id: 6, title: "Auravia — Seat expansion", company: "Auravia", owner: "Sam Rivera", stage: "Proposal", value: 41000, probability: 45, expectedCloseAt: daysAhead(28) },
  { id: 7, title: "Kestrel Group — Annual renewal", company: "Kestrel Group", owner: "Maya Larsen", stage: "Lost", value: 36000, probability: 0, expectedCloseAt: daysAgo(21) },
  { id: 8, title: "Ironleaf — Platform upgrade", company: "Ironleaf", owner: "Theo Papadakis", stage: "Qualified", value: 29500, probability: 20, expectedCloseAt: daysAhead(95) },
  { id: 9, title: "Brightpath — Pilot rollout", company: "Brightpath", owner: "Alex Morgan", stage: "Won", value: 24000, probability: 100, expectedCloseAt: daysAgo(15) },
  { id: 10, title: "Lumen Works — Migration", company: "Lumen Works", owner: "Sam Rivera", stage: "Qualified", value: 18000, probability: 30, expectedCloseAt: daysAhead(52) },
  { id: 11, title: "Quillon — Seat expansion", company: "Quillon", owner: "Maya Larsen", stage: "Proposal", value: 9800, probability: 60, expectedCloseAt: daysAhead(18) },
  { id: 12, title: "Meridian Bay — Annual renewal", company: "Meridian Bay", owner: "Theo Papadakis", stage: "Negotiation", value: 6200, probability: 85, expectedCloseAt: daysAhead(5) },
];

export const listDeals = (params) =>
  // dealsApi.get("/", params);
  mockList(SAMPLE_DEALS, params, { searchFields: ["title", "company", "owner", "stage"] });

export const getDeal = (id) =>
  // dealsApi.get(`/${id}/`);
  mockOne(SAMPLE_DEALS, id);

export const createDeal = (payload) =>
  // dealsApi.post("/", payload);
  mockMutate(payload);

export const updateDeal = (id, payload) =>
  // dealsApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteDeal = (id) =>
  // dealsApi.delete(`/${id}/`);
  mockMutate({ id });
