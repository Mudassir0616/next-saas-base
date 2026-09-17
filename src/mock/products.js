import { daysAgo, intBetween, pick, rng } from "./seed";

const NAMES = [
  "Pipeline Automation", "Lead Scoring", "Email Sequencer", "Call Recording",
  "Revenue Forecast", "Contract Builder", "Quote Generator", "Territory Planner",
  "Data Enrichment", "Meeting Scheduler", "Churn Predictor", "Onboarding Flows",
  "Custom Reports", "Webhooks Gateway", "Audit Trail", "SSO & SCIM",
  "Mobile Companion", "Slack Sync", "Invoice Reminders", "Usage Analytics",
  "Sandbox Environment", "Bulk Importer", "Role Designer", "Signature Capture",
];

const rand = rng(918273);

export const products = NAMES.map((name, i) => {
  const stock = intBetween(0, 320, rand);

  return {
    id: i + 1,
    name,
    sku: `SKU-${String(1000 + i * 7)}`,
    category: pick(["Automation", "Analytics", "Integrations", "Security", "Billing"], rand),
    price: intBetween(9, 499, rand),
    stock,
    status: stock === 0 ? "out_of_stock" : stock < 40 ? "low_stock" : "in_stock",
    updatedAt: daysAgo(intBetween(0, 90, rand), rand),
  };
});
