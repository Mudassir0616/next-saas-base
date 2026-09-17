import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { chartTheme, tooltipStyle } from "@/lib/chartSetup";
import { useTheme } from "@/context/ThemeContext";
import { formatCompact, formatCurrency } from "@/lib/format";

export default function PipelineChart({ labels, data: values }) {
  const { isDark } = useTheme();

  const { data, options } = useMemo(() => {
    const theme = chartTheme(isDark);

    return {
      data: {
        labels,
        datasets: [
          {
            label: "Value",
            data: values,
            backgroundColor: theme.categorical,
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 46,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltipStyle(theme),
            callbacks: { label: (ctx) => ` ${formatCurrency(ctx.parsed.y)}` },
          },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: theme.tick } },
          y: {
            grid: { color: theme.grid },
            border: { display: false },
            ticks: { color: theme.tick, callback: (value) => formatCompact(value) },
          },
        },
      },
    };
  }, [labels, values, isDark]);

  return (
    <div className="chart-box">
      <Bar data={data} options={options} />
    </div>
  );
}
