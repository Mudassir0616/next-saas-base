import { COMPANIES, daysAgo, daysAhead, intBetween, pick, rng } from "./seed";

export const INVOICE_STATUSES = ["paid", "pending", "overdue", "draft"];

const rand = rng(3391822);

export const invoices = Array.from({ length: 38 }, (_, i) => {
  const status = pick(INVOICE_STATUSES, rand);
  const issuedAt = daysAgo(intBetween(1, 200, rand), rand);

  return {
    id: i + 1,
    number: `INV-${String(2451 + i)}`,
    company: pick(COMPANIES, rand),
    amount: intBetween(120, 24_000, rand),
    status,
    issuedAt,
    dueAt: status === "overdue" ? daysAgo(intBetween(1, 40, rand), rand) : daysAhead(intBetween(2, 45, rand), rand),
    method: pick(["Card", "Bank transfer", "ACH", "Wire"], rand),
  };
});
