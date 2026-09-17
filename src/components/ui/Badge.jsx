const TONES = {
  active: "success",
  paid: "success",
  won: "success",
  in_stock: "success",

  trial: "info",
  pending: "info",
  invited: "info",
  qualified: "info",
  proposal: "info",

  low_stock: "warning",
  negotiation: "warning",
  lead: "warning",

  overdue: "danger",
  churned: "danger",
  suspended: "danger",
  lost: "danger",
  out_of_stock: "danger",

  draft: "neutral",
};

const toTitle = (value = "") =>
  String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const toneFor = (value) => TONES[String(value).toLowerCase()] ?? "neutral";

export default function Badge({ value, tone, label }) {
  return (
    <span className="badge" data-tone={tone ?? toneFor(value)}>
      {label ?? toTitle(value)}
    </span>
  );
}
