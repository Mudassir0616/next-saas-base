import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/auth/LoginForm";
import PublicLayout from "@/layouts/PublicLayout";
import { useAuth } from "@/context/AuthContext";

/**
 * `next` arrives from the query string, so only same-origin paths are accepted —
 * "//evil.com" and absolute URLs would otherwise navigate off-site.
 */
const safeRedirect = (value) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/dashboard";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(safeRedirect(router.query.next));
    }
  }, [loading, isAuthenticated, router]);

  return <LoginForm />;
}

LoginPage.getLayout = (page) => <PublicLayout>{page}</PublicLayout>;
