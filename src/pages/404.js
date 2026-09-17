import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="error-page">
      <div>
        <p className="error-code">404</p>
        <h1 style={{ fontSize: 20, margin: "12px 0 6px" }}>Page not found</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 22 }}>
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="btn btn-primary">
          {isAuthenticated ? "Back to dashboard" : "Back to sign in"}
        </Link>
      </div>
    </div>
  );
}
