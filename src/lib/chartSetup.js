import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
ChartJS.defaults.font.size = 12;

/** Palette + axis styling for the active theme. */
export const chartTheme = (isDark) => ({
  brand: "#6366f1",
  brandSoft: isDark ? "rgba(99, 102, 241, 0.22)" : "rgba(99, 102, 241, 0.14)",
  accent: "#0ea5e9",
  accentSoft: isDark ? "rgba(14, 165, 233, 0.2)" : "rgba(14, 165, 233, 0.12)",
  categorical: ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"],
  grid: isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(17, 24, 39, 0.07)",
  tick: isDark ? "#7b8597" : "#9ca3af",
  surface: isDark ? "#1a2030" : "#ffffff",
  text: isDark ? "#f3f4f6" : "#111827",
  border: isDark ? "#262d3d" : "#e5e7eb",
});

export const tooltipStyle = (theme) => ({
  backgroundColor: theme.surface,
  titleColor: theme.text,
  bodyColor: theme.text,
  borderColor: theme.border,
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
  displayColors: true,
  boxPadding: 4,
});
