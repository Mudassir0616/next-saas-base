import { Handshake, Plus } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import useTable from "@/hooks/useTable";
import { listDeals } from "@/services/dealsService";
import { formatCurrency, formatDate } from "@/lib/format";

const columns = [
  {
    key: "title",
    label: "Deal",
    sortable: true,
    render: (row) => (
      <div>
        <div className="cell-primary">{row.title}</div>
        <div className="cell-sub">{row.company}</div>
      </div>
    ),
  },
  {
    key: "owner",
    label: "Owner",
    sortable: true,
    render: (row) => (
      <div className="cell-stack">
        <Avatar name={row.owner} size={28} />
        <span>{row.owner}</span>
      </div>
    ),
  },
  { key: "stage", label: "Stage", sortable: true, render: (row) => <Badge value={row.stage} /> },
  {
    key: "probability",
    label: "Probability",
    sortable: true,
    align: "right",
    render: (row) => `${row.probability}%`,
  },
  {
    key: "value",
    label: "Value",
    sortable: true,
    align: "right",
    render: (row) => <span className="cell-primary">{formatCurrency(row.value)}</span>,
  },
  {
    key: "expectedCloseAt",
    label: "Expected close",
    sortable: true,
    render: (row) => formatDate(row.expectedCloseAt),
  },
];

export default function DealsPage() {
  const table = useTable(listDeals, { ordering: "-value" });

  return (
    <>
      <PageHeader
        title="Deals"
        subtitle="Track every opportunity moving through your pipeline."
        actions={
          <button type="button" className="btn btn-primary" onClick={() => toast.info("Hook this up to your create form")}>
            <Plus size={16} />
            New deal
          </button>
        }
      />

      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        searchPlaceholder="Search deals, companies or owners…"
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
        empty={{ icon: Handshake, title: "No deals found", message: "Try a different search term." }}
      />
    </>
  );
}

DealsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
