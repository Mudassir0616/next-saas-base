import { Bell, Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Avatar from "@/components/ui/Avatar";

export default function Topbar({ collapsed, onToggleCollapse, onOpenMobile }) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn desktop-only"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
      </button>

      <button type="button" className="icon-btn mobile-only" onClick={onOpenMobile} aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="topbar-search">
        <Search size={16} />
        <input type="search" placeholder="Search customers, deals, invoices…" aria-label="Global search" />
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button type="button" className="icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <span className="icon-btn-dot" />
        </button>

        {user && <Avatar name={user.name} size={34} />}
      </div>
    </header>
  );
}
