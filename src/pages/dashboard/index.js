import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import PipelineChart from "@/components/dashboard/PipelineChart";
import PlanChart from "@/components/dashboard/PlanChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Badge from "@/components/ui/Badge";
import { getDashboard } from "@/services/dashboardService";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/format";

function StatSkeleton() {
  return (
    <article className="stat-card">
      <span className="skeleton-line" style={{ display: "block", width: "55%", marginBottom: 18 }} />
      <span className="skeleton-line" style={{ display: "block", height: 24, width: "45%" }} />
    </article>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    getDashboard().then((response) => {
      if (active) setData(response);
    });
    return () => {
      active = false;
    };
  }, []);

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Here is how your pipeline is performing this month."
      />

      <div className="stat-grid">
        {data
          ? data.stats.map((stat) => <StatCard key={stat.key} {...stat} />)
          : Array.from({ length: 4 }, (_, i) => <StatSkeleton key={i} />)}
      </div>

      <div className="grid grid-2-1">
        <Card title="Revenue vs expenses">
          {data ? <RevenueChart series={data.revenueSeries} /> : <div className="chart-box" />}
        </Card>

        <Card title="Customers by plan">
          {data ? (
            <PlanChart labels={data.customersByPlan.labels} data={data.customersByPlan.data} />
          ) : (
            <div className="chart-box" />
          )}
        </Card>
      </div>

      <div className="grid grid-2">
        <Card title="Pipeline by stage">
          {data ? (
            <PipelineChart labels={data.pipelineByStage.labels} data={data.pipelineByStage.data} />
          ) : (
            <div className="chart-box" />
          )}
        </Card>

        <Card
          title="Recent activity"
          bodyClassName=""
          action={
            <Link href="/deals" className="login-link" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              View deals <ArrowRight size={14} />
            </Link>
          }
        >
          {data ? <ActivityFeed items={data.activity} /> : <div style={{ height: 280 }} />}
        </Card>
      </div>

      <Card title="Top deals" bodyClassName="">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Company</th>
                <th>Stage</th>
                <th style={{ textAlign: "right" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {(data?.topDeals ?? []).map((deal) => (
                <tr key={deal.id}>
                  <td className="cell-primary">{deal.title}</td>
                  <td>{deal.company}</td>
                  <td>
                    <Badge value={deal.stage} />
                  </td>
                  <td style={{ textAlign: "right" }} className="cell-primary">
                    {formatCurrency(deal.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
