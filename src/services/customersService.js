import { customers } from "@/mock/customers";
import { mockList, mockMutate, mockOne } from "./mockClient";
// import { customersApi } from "./endpoints";

export const listCustomers = (params) =>
  // customersApi.get("/", params);
  mockList(customers, params, { searchFields: ["name", "email", "company", "country"] });

export const getCustomer = (id) =>
  // customersApi.get(`/${id}/`);
  mockOne(customers, id);

export const createCustomer = (payload) =>
  // customersApi.post("/", payload);
  mockMutate(payload);

export const updateCustomer = (id, payload) =>
  // customersApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteCustomer = (id) =>
  // customersApi.delete(`/${id}/`);
  mockMutate({ id });
