import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartTheme, tooltipStyle } from "@/lib/chartSetup";
import { useTheme } from "@/context/ThemeContext";

export default function PlanChart({ labels, data: values }) {
  const { isDark } = useTheme();

  const { data, options } = useMemo(() => {
    const theme = chartTheme(isDark);

    return {
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: theme.categorical,
            borderColor: theme.surface,
            borderWidth: 3,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              padding: 14,
              usePointStyle: true,
              pointStyle: "circle",
              color: theme.tick,
            },
          },
          tooltip: {
            ...tooltipStyle(theme),
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} customers` },
          },
        },
      },
    };
  }, [labels, values, isDark]);

  return (
    <div className="chart-box">
      <Doughnut data={data} options={options} />
    </div>
  );
}
