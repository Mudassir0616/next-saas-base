/**
 * Deterministic pseudo-random helpers so mock records stay identical across
 * reloads and between server and client renders.
 */

export const rng = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const pick = (list, rand) => list[Math.floor(rand() * list.length)];

export const intBetween = (min, max, rand) => Math.floor(rand() * (max - min + 1)) + min;

/** A date `daysAgo` days before now, jittered by hours for realism. */
export const daysAgo = (days, rand = () => 0.5) =>
  new Date(Date.now() - days * 86400000 - Math.floor(rand() * 86400000)).toISOString();

export const daysAhead = (days, rand = () => 0.5) =>
  new Date(Date.now() + days * 86400000 + Math.floor(rand() * 86400000)).toISOString();

export const FIRST_NAMES = [
  "Amara", "Noah", "Priya", "Liam", "Sofia", "Ethan", "Mei", "Lucas",
  "Zara", "Oliver", "Ines", "Mateo", "Aisha", "Hugo", "Yuki", "Elena",
  "Omar", "Clara", "Idris", "Nina", "Felix", "Rania", "Theo", "Maya",
  "Jonas", "Leila", "Caleb", "Anya", "Marco", "Dita", "Rohan", "Freya",
];

export const LAST_NAMES = [
  "Okafor", "Bennett", "Raman", "Novak", "Alvarez", "Whitfield", "Chen", "Duarte",
  "Haddad", "Lindqvist", "Moreau", "Castillo", "Karim", "Vogel", "Tanaka", "Petrova",
  "Farouk", "Ibarra", "Mensah", "Kowalski", "Baumann", "Aziz", "Papadakis", "Larsen",
];

export const COMPANIES = [
  "Northwind Labs", "Brightpath", "Lumen Works", "Kestrel Group", "Auravia",
  "Stonebridge", "Vela Systems", "Corterra", "Halcyon Data", "Tidewater Co",
  "Quillon", "Marrow & Finch", "Fernbrook", "Orlin Industries", "Sable Ridge",
  "Pinecrest", "Vantage Nine", "Calder Studio", "Meridian Bay", "Ashfield",
  "Ironleaf", "Solstice Media", "Beacon Hill", "Wrenfield",
];

export const emailFor = (name, company) => {
  const user = name.toLowerCase().replace(/\s+/g, ".");
  const domain = company.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14);
  return `${user}@${domain}.com`;
};
