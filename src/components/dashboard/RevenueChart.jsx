import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { chartTheme, tooltipStyle } from "@/lib/chartSetup";
import { useTheme } from "@/context/ThemeContext";
import { formatCompact, formatCurrency } from "@/lib/format";

export default function RevenueChart({ series }) {
  const { isDark } = useTheme();

  const { data, options } = useMemo(() => {
    const theme = chartTheme(isDark);
    const fills = [
      { border: theme.brand, background: theme.brandSoft },
      { border: theme.accent, background: theme.accentSoft },
    ];

    return {
      data: {
        labels: series.labels,
        datasets: series.datasets.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: fills[index].border,
          backgroundColor: fills[index].background,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointHoverBackgroundColor: fills[index].border,
          pointHoverBorderColor: theme.surface,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, pointStyle: "circle", color: theme.tick },
          },
          tooltip: {
            ...tooltipStyle(theme),
            callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: theme.tick },
          },
          y: {
            grid: { color: theme.grid },
            border: { display: false },
            ticks: { color: theme.tick, callback: (value) => formatCompact(value) },
          },
        },
      },
    };
  }, [series, isDark]);

  return (
    <div className="chart-box">
      <Line data={data} options={options} />
    </div>
  );
}
