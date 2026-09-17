import { UserPlus, UserSquare } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import useTable from "@/hooks/useTable";
import { listTeam } from "@/services/teamService";
import { formatDate, formatRelativeTime } from "@/lib/format";

const columns = [
  {
    key: "name",
    label: "Member",
    sortable: true,
    render: (row) => (
      <div className="cell-stack">
        <Avatar name={row.name} />
        <div>
          <div className="cell-primary">{row.name}</div>
          <div className="cell-sub">{row.email}</div>
        </div>
      </div>
    ),
  },
  { key: "role", label: "Role", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (row) => <Badge value={row.status} /> },
  {
    key: "lastActiveAt",
    label: "Last active",
    sortable: true,
    render: (row) => formatRelativeTime(row.lastActiveAt),
  },
  { key: "joinedAt", label: "Joined", sortable: true, render: (row) => formatDate(row.joinedAt) },
];

export default function TeamPage() {
  const table = useTable(listTeam, { ordering: "name" });

  return (
    <>
      <PageHeader
        title="Team"
        subtitle="Manage who has access to this workspace."
        actions={
          <button type="button" className="btn btn-primary" onClick={() => toast.info("Hook this up to your invite flow")}>
            <UserPlus size={16} />
            Invite member
          </button>
        }
      />

      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        searchPlaceholder="Search by name, email or role…"
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
        empty={{ icon: UserSquare, title: "No members found", message: "Try a different search term." }}
      />
    </>
  );
}

TeamPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
