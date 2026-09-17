import { useMemo } from "react";
import Head from "next/head";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { buildMuiTheme } from "@/lib/muiTheme";
import { site } from "@/config/site";
import "@/lib/chartSetup";

function Providers({ children }) {
  const { theme } = useTheme();
  const muiTheme = useMemo(() => buildMuiTheme(theme), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer position="bottom-right" theme={theme} autoClose={3000} newestOnTop />
    </MuiThemeProvider>
  );
}

export default function App({ Component, pageProps }) {
  // Pages opt into a shell by exporting `getLayout`; anything else renders bare.
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{site.name}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ThemeProvider>
        <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
      </ThemeProvider>
    </>
  );
}
