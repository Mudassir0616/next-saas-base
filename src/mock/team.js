import { FIRST_NAMES, LAST_NAMES, daysAgo, emailFor, intBetween, pick, rng } from "./seed";

const rand = rng(55120394);

export const team = Array.from({ length: 14 }, (_, i) => {
  const name = `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, rand)}`;

  return {
    id: i + 1,
    name,
    email: emailFor(name, "acme"),
    role: i === 0 ? "Administrator" : pick(["Administrator", "Manager", "Member", "Viewer"], rand),
    department: pick(["Sales", "Support", "Marketing", "Finance", "Engineering"], rand),
    status: pick(["active", "active", "active", "invited", "suspended"], rand),
    lastActiveAt: daysAgo(intBetween(0, 30, rand), rand),
    joinedAt: daysAgo(intBetween(30, 900, rand), rand),
  };
});
