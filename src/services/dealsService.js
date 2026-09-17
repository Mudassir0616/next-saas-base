import { deals } from "@/mock/deals";
import { mockList, mockMutate, mockOne } from "./mockClient";
// import { dealsApi } from "./endpoints";

export const listDeals = (params) =>
  // dealsApi.get("/", params);
  mockList(deals, params, { searchFields: ["title", "company", "owner", "stage"] });

export const getDeal = (id) =>
  // dealsApi.get(`/${id}/`);
  mockOne(deals, id);

export const createDeal = (payload) =>
  // dealsApi.post("/", payload);
  mockMutate(payload);

export const updateDeal = (id, payload) =>
  // dealsApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteDeal = (id) =>
  // dealsApi.delete(`/${id}/`);
  mockMutate({ id });
