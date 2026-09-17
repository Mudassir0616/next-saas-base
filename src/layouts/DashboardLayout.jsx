import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const COLLAPSE_KEY = "sidebar_collapsed";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "true");
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const toggleCollapse = () => {
    const next = !collapsed;
    window.localStorage.setItem(COLLAPSE_KEY, String(next));
    setCollapsed(next);
  };

  return (
    <ProtectedRoute>
      <div className="app-shell">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onNavigate={() => setMobileOpen(false)}
        />

        {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

        <div className="app-main" data-collapsed={collapsed}>
          <Topbar
            collapsed={collapsed}
            onToggleCollapse={toggleCollapse}
            onOpenMobile={() => setMobileOpen(true)}
          />
          <main className="app-content">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/** Used by pages via the `getLayout` pattern in _app.js. */
export const withDashboardLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
