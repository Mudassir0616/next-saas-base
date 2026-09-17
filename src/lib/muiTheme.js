import { createTheme } from "@mui/material/styles";

/** Mirrors the CSS custom properties in styles/globals.css. */
export const buildMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#4f46e5" },
      error: { main: mode === "dark" ? "#f87171" : "#dc2626" },
      background: {
        default: mode === "dark" ? "#0b0f19" : "#f6f7fb",
        paper: mode === "dark" ? "#131826" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f3f4f6" : "#111827",
        secondary: mode === "dark" ? "#b6bdcc" : "#4b5563",
      },
      divider: mode === "dark" ? "#262d3d" : "#e5e7eb",
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 14,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: { padding: "10px 12px" },
        },
      },
    },
  });
