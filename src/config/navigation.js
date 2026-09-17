import {
  Boxes,
  FileText,
  Handshake,
  LayoutDashboard,
  Settings,
  Users,
  UserSquare,
} from "lucide-react";

export const navigation = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Sales",
    items: [
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Deals", href: "/deals", icon: Handshake },
      { label: "Invoices", href: "/invoices", icon: FileText },
    ],
  },
  {
    section: "Catalog",
    items: [{ label: "Products", href: "/products", icon: Boxes }],
  },
  {
    section: "Workspace",
    items: [
      { label: "Team", href: "/team", icon: UserSquare },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
