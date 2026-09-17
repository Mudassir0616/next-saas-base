import { ArrowDownRight, ArrowUpRight, FileText, TrendingUp, Users, Wallet } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/format";

const ICONS = {
  revenue: { Icon: Wallet, color: "#6366f1" },
  customers: { Icon: Users, color: "#0ea5e9" },
  pipeline: { Icon: TrendingUp, color: "#10b981" },
  invoices: { Icon: FileText, color: "#f59e0b" },
};

export default function StatCard({ label, value, format, delta, icon }) {
  const { Icon, color } = ICONS[icon] ?? ICONS.revenue;
  const up = delta >= 0;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-icon" style={{ background: `${color}1f`, color }}>
          <Icon size={17} />
        </span>
      </div>

      <div className="stat-card-value">
        {format === "currency" ? formatCurrency(value) : formatNumber(value)}
      </div>

      <div className="stat-card-delta" data-dir={up ? "up" : "down"}>
        <Arrow size={14} />
        {Math.abs(delta)}%<span>vs last month</span>
      </div>
    </article>
  );
}
