import { products } from "@/mock/products";
import { mockList, mockMutate, mockOne } from "./mockClient";
// import { productsApi } from "./endpoints";

export const listProducts = (params) =>
  // productsApi.get("/", params);
  mockList(products, params, { searchFields: ["name", "sku", "category"] });

export const getProduct = (id) =>
  // productsApi.get(`/${id}/`);
  mockOne(products, id);

export const createProduct = (payload) =>
  // productsApi.post("/", payload);
  mockMutate(payload);

export const updateProduct = (id, payload) =>
  // productsApi.patch(`/${id}/`, payload);
  mockMutate(payload);

export const deleteProduct = (id) =>
  // productsApi.delete(`/${id}/`);
  mockMutate({ id });
