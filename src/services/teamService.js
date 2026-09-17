import { team } from "@/mock/team";
import { mockList, mockMutate } from "./mockClient";
// import { teamApi } from "./endpoints";

export const listTeam = (params) =>
  // teamApi.get("/", params);
  mockList(team, params, { searchFields: ["name", "email", "role", "department"] });

export const inviteMember = (payload) =>
  // teamApi.post("/invite/", payload);
  mockMutate(payload);

export const removeMember = (id) =>
  // teamApi.delete(`/${id}/`);
  mockMutate({ id });
