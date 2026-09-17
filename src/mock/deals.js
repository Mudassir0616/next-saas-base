import { COMPANIES, FIRST_NAMES, LAST_NAMES, daysAhead, daysAgo, intBetween, pick, rng } from "./seed";

export const DEAL_STAGES = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const rand = rng(776120);

export const deals = Array.from({ length: 34 }, (_, i) => {
  const company = pick(COMPANIES, rand);
  const stage = pick(DEAL_STAGES, rand);
  const closed = stage === "Won" || stage === "Lost";

  return {
    id: i + 1,
    title: `${company} — ${pick(["Annual renewal", "Platform upgrade", "Seat expansion", "Pilot rollout", "Migration"], rand)}`,
    company,
    owner: `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, rand)}`,
    stage,
    value: intBetween(2_000, 180_000, rand),
    probability: closed ? (stage === "Won" ? 100 : 0) : intBetween(15, 90, rand),
    expectedCloseAt: closed ? daysAgo(intBetween(1, 60, rand), rand) : daysAhead(intBetween(3, 120, rand), rand),
    createdAt: daysAgo(intBetween(10, 300, rand), rand),
  };
});
