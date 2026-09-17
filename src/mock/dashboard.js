import { customers } from "./customers";
import { DEAL_STAGES, deals } from "./deals";
import { invoices } from "./invoices";
import { FIRST_NAMES, LAST_NAMES, daysAgo, intBetween, pick, rng } from "./seed";

const rand = rng(424242);

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const activeCustomers = customers.filter((c) => c.status === "active");
const paidInvoices = invoices.filter((i) => i.status === "paid");

export const dashboard = {
  stats: [
    {
      key: "mrr",
      label: "Monthly recurring revenue",
      value: activeCustomers.reduce((sum, c) => sum + c.mrr, 0),
      format: "currency",
      delta: 12.4,
      icon: "revenue",
    },
    {
      key: "customers",
      label: "Active customers",
      value: activeCustomers.length,
      format: "number",
      delta: 4.1,
      icon: "customers",
    },
    {
      key: "pipeline",
      label: "Open pipeline",
      value: deals
        .filter((d) => d.stage !== "Won" && d.stage !== "Lost")
        .reduce((sum, d) => sum + d.value, 0),
      format: "currency",
      delta: -2.8,
      icon: "pipeline",
    },
    {
      key: "collected",
      label: "Collected this quarter",
      value: paidInvoices.reduce((sum, i) => sum + i.amount, 0),
      format: "currency",
      delta: 8.9,
      icon: "invoices",
    },
  ],

  revenueSeries: {
    labels: MONTHS,
    datasets: [
      { label: "Revenue", data: MONTHS.map(() => intBetween(48_000, 132_000, rand)) },
      { label: "Expenses", data: MONTHS.map(() => intBetween(28_000, 71_000, rand)) },
    ],
  },

  pipelineByStage: {
    labels: DEAL_STAGES,
    data: DEAL_STAGES.map((stage) =>
      deals.filter((d) => d.stage === stage).reduce((sum, d) => sum + d.value, 0)
    ),
  },

  customersByPlan: {
    labels: ["Starter", "Growth", "Scale", "Enterprise"],
    data: ["Starter", "Growth", "Scale", "Enterprise"].map(
      (plan) => customers.filter((c) => c.plan === plan).length
    ),
  },

  activity: Array.from({ length: 7 }, (_, i) => {
    const actor = `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, rand)}`;
    const action = pick(
      [
        `closed a deal with ${pick(customers, rand).company}`,
        `added ${pick(customers, rand).company} as a customer`,
        `sent invoice ${pick(invoices, rand).number}`,
        `moved a deal to ${pick(DEAL_STAGES, rand)}`,
        `invited a new teammate`,
        `updated billing settings`,
      ],
      rand
    );

    return {
      id: i + 1,
      actor,
      action,
      at: daysAgo(i * 0.4 + 0.05, rand),
    };
  }),

  topDeals: [...deals]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map(({ id, title, company, value, stage }) => ({ id, title, company, value, stage })),
};
