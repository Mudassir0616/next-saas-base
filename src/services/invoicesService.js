import { invoices } from "@/mock/invoices";
import { mockList, mockMutate, mockOne } from "./mockClient";
// import { invoicesApi } from "./endpoints";

export const listInvoices = (params) =>
  // invoicesApi.get("/", params);
  mockList(invoices, params, { searchFields: ["number", "company", "status", "method"] });

export const getInvoice = (id) =>
  // invoicesApi.get(`/${id}/`);
  mockOne(invoices, id);

export const deleteInvoice = (id) =>
  // invoicesApi.delete(`/${id}/`);
  mockMutate({ id });
