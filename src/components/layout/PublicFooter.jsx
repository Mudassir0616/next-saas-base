import Link from "next/link";
import { site } from "@/config/site";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>

        <nav className="public-footer-links">
          <Link href="/">Privacy</Link>
          <Link href="/">Terms</Link>
          <a href={`mailto:${site.supportEmail}`}>Support</a>
        </nav>
      </div>
    </footer>
  );
}
