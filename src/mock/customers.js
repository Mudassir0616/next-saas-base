import { COMPANIES, FIRST_NAMES, LAST_NAMES, daysAgo, emailFor, intBetween, pick, rng } from "./seed";

const STATUSES = ["active", "trial", "churned", "lead"];
const PLANS = ["Starter", "Growth", "Scale", "Enterprise"];
const COUNTRIES = ["United States", "Germany", "India", "Brazil", "Japan", "Spain", "Canada", "Kenya"];

const rand = rng(20240517);

export const customers = Array.from({ length: 48 }, (_, i) => {
  const name = `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, rand)}`;
  const company = pick(COMPANIES, rand);
  const plan = pick(PLANS, rand);

  return {
    id: i + 1,
    name,
    email: emailFor(name, company),
    company,
    plan,
    status: pick(STATUSES, rand),
    country: pick(COUNTRIES, rand),
    mrr: intBetween(49, 4800, rand),
    openDeals: intBetween(0, 5, rand),
    createdAt: daysAgo(intBetween(1, 540, rand), rand),
    lastActiveAt: daysAgo(intBetween(0, 45, rand), rand),
  };
});
