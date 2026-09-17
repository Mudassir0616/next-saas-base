import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, Zap } from "lucide-react";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/ui/Avatar";

export default function Sidebar({ collapsed, mobileOpen, onNavigate }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (href) => router.pathname === href || router.pathname.startsWith(`${href}/`);

  return (
    <aside className="sidebar" data-collapsed={collapsed} data-mobile-open={mobileOpen}>
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">
          <Zap size={17} fill="currentColor" />
        </span>
        {!collapsed && <span className="sidebar-brand-name">{site.name}</span>}
      </div>

      <nav className="sidebar-nav">
        {navigation.map((group) => (
          <div key={group.section}>
            {!collapsed && <p className="sidebar-section-label">{group.section}</p>}

            {group.items.map(({ label, href, icon: Icon, badge }) => (
              <Link
                key={href}
                href={href}
                className="sidebar-link"
                data-active={isActive(href)}
                title={collapsed ? label : undefined}
                onClick={onNavigate}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && badge && <span className="sidebar-link-badge">{badge}</span>}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && user && (
          <div className="sidebar-user">
            <Avatar name={user.name} size={34} />
            <div style={{ minWidth: 0 }}>
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">{user.role}</div>
            </div>
          </div>
        )}

        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={logout}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
