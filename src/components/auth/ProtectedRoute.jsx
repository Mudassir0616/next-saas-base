import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const allowed = !roles || (user && roles.includes(user.role));

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace(`/?next=${encodeURIComponent(router.asPath)}`);
    } else if (!allowed) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, allowed, router]);

  if (loading || !isAuthenticated || !allowed) {
    return (
      <div className="full-center">
        <span className="spinner" style={{ borderTopColor: "var(--brand-600)", width: 26, height: 26 }} />
      </div>
    );
  }

  return children;
}
