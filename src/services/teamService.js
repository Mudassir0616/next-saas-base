import { daysAgo, mockList, mockMutate } from "./mockClient";
// import { teamApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
const SAMPLE_TEAM = [
  { id: 1, name: "Alex Morgan", email: "alex.morgan@acme.com", role: "Administrator", department: "Sales", status: "active", lastActiveAt: daysAgo(0.01), joinedAt: daysAgo(880) },
  { id: 2, name: "Sam Rivera", email: "sam.rivera@acme.com", role: "Member", department: "Sales", status: "active", lastActiveAt: daysAgo(0.2), joinedAt: daysAgo(540) },
  { id: 3, name: "Maya Larsen", email: "maya.larsen@acme.com", role: "Manager", department: "Sales", status: "active", lastActiveAt: daysAgo(1), joinedAt: daysAgo(610) },
  { id: 4, name: "Theo Papadakis", email: "theo.papadakis@acme.com", role: "Member", department: "Sales", status: "active", lastActiveAt: daysAgo(0.6), joinedAt: daysAgo(300) },
  { id: 5, name: "Clara Ibarra", email: "clara.ibarra@acme.com", role: "Manager", department: "Support", status: "active", lastActiveAt: daysAgo(2), joinedAt: daysAgo(720) },
  { id: 6, name: "Idris Mensah", email: "idris.mensah@acme.com", role: "Member", department: "Support", status: "invited", lastActiveAt: null, joinedAt: daysAgo(3) },
  { id: 7, name: "Nina Kowalski", email: "nina.kowalski@acme.com", role: "Member", department: "Marketing", status: "active", lastActiveAt: daysAgo(4), joinedAt: daysAgo(190) },
  { id: 8, name: "Felix Baumann", email: "felix.baumann@acme.com", role: "Viewer", department: "Finance", status: "active", lastActiveAt: daysAgo(9), joinedAt: daysAgo(410) },
  { id: 9, name: "Rania Aziz", email: "rania.aziz@acme.com", role: "Administrator", department: "Engineering", status: "active", lastActiveAt: daysAgo(0.05), joinedAt: daysAgo(830) },
  { id: 10, name: "Jonas Farouk", email: "jonas.farouk@acme.com", role: "Member", department: "Engineering", status: "suspended", lastActiveAt: daysAgo(40), joinedAt: daysAgo(260) },
  { id: 11, name: "Freya Whitfield", email: "freya.whitfield@acme.com", role: "Viewer", department: "Marketing", status: "invited", lastActiveAt: null, joinedAt: daysAgo(1) },
];

export const listTeam = (params) =>
  // teamApi.get("/", params);
  mockList(SAMPLE_TEAM, params, { searchFields: ["name", "email", "role", "department"] });

export const inviteMember = (payload) =>
  // teamApi.post("/invite/", payload);
  mockMutate(payload);

export const removeMember = (id) =>
  // teamApi.delete(`/${id}/`);
  mockMutate({ id });
