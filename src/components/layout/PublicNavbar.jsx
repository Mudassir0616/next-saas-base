import Link from "next/link";
import { Moon, Sun, Zap } from "lucide-react";
import { site } from "@/config/site";
import { useTheme } from "@/context/ThemeContext";

export default function PublicNavbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="public-nav">
      <div className="public-nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Zap size={17} fill="currentColor" />
          </span>
          {site.name}
        </Link>

        <nav className="public-nav-links">
          <Link href="/">Product</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Docs</Link>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
