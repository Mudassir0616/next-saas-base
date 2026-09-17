import PublicFooter from "@/components/layout/PublicFooter";
import PublicNavbar from "@/components/layout/PublicNavbar";

export default function PublicLayout({ children }) {
  return (
    <div className="public-shell">
      <PublicNavbar />
      <main className="public-body">{children}</main>
      <PublicFooter />
    </div>
  );
}
