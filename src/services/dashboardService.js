import { daysAgo, delay } from "./mockClient";
// import { dashboardApi } from "./endpoints";

// Sample data — delete this block when the real API is wired up below.
// This is the shape one `/dashboard/summary/` response is expected to have.
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const SAMPLE_DASHBOARD = {
  // format: "currency" | "number"; icon: "revenue" | "customers" | "pipeline" | "invoices"
  stats: [
    { key: "mrr", label: "Monthly recurring revenue", value: 16678, format: "currency", delta: 12.4, icon: "revenue" },
    { key: "customers", label: "Active customers", value: 9, format: "number", delta: 4.1, icon: "customers" },
    { key: "pipeline", label: "Open pipeline", value: 575000, format: "currency", delta: -2.8, icon: "pipeline" },
    { key: "collected", label: "Collected this quarter", value: 28437, format: "currency", delta: 8.9, icon: "invoices" },
  ],

  revenueSeries: {
    labels: MONTHS,
    datasets: [
      { label: "Revenue", data: [58000, 62500, 61000, 70400, 76800, 74200, 83900, 91500, 98200, 104800, 118300, 129600] },
      { label: "Expenses", data: [34000, 36500, 35200, 41800, 43900, 42100, 47600, 52300, 55800, 58400, 63900, 68700] },
    ],
  },

  pipelineByStage: {
    labels: ["Qualified", "Proposal", "Negotiation", "Won", "Lost"],
    data: [135500, 192800, 246700, 120000, 36000],
  },

  customersByPlan: {
    labels: ["Starter", "Growth", "Scale", "Enterprise"],
    data: [4, 4, 4, 3],
  },

  activity: [
    { id: 1, actor: "Alex Morgan", action: "moved a deal to Negotiation", at: daysAgo(0.02) },
    { id: 2, actor: "Sam Rivera", action: "sent invoice INV-2461", at: daysAgo(0.15) },
    { id: 3, actor: "Maya Larsen", action: "closed a deal with Halcyon Data", at: daysAgo(0.6) },
    { id: 4, actor: "Theo Papadakis", action: "added Corterra as a customer", at: daysAgo(1.1) },
    { id: 5, actor: "Clara Ibarra", action: "invited a new teammate", at: daysAgo(1.6) },
    { id: 6, actor: "Rania Aziz", action: "updated billing settings", at: daysAgo(2.3) },
    { id: 7, actor: "Alex Morgan", action: "closed a deal with Brightpath", at: daysAgo(2.9) },
  ],

  topDeals: [
    { id: 1, title: "Northwind Labs — Annual renewal", company: "Northwind Labs", value: 168000, stage: "Negotiation" },
    { id: 2, title: "Vela Systems — Platform upgrade", company: "Vela Systems", value: 142000, stage: "Proposal" },
    { id: 3, title: "Halcyon Data — Seat expansion", company: "Halcyon Data", value: 96000, stage: "Won" },
    { id: 4, title: "Sable Ridge — Pilot rollout", company: "Sable Ridge", value: 88000, stage: "Qualified" },
    { id: 5, title: "Fernbrook — Migration", company: "Fernbrook", value: 72500, stage: "Negotiation" },
  ],
};

/** One call returns everything the dashboard renders. */
export const getDashboard = async () => {
  // return dashboardApi.get("/summary/");

  await delay(380);
  return SAMPLE_DASHBOARD;
};
