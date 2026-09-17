import { Download, FileText } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import useTable from "@/hooks/useTable";
import { listInvoices } from "@/services/invoicesService";
import { formatCurrency, formatDate } from "@/lib/format";

const columns = [
  { key: "number", label: "Invoice", sortable: true, render: (row) => <span className="cell-primary">{row.number}</span> },
  { key: "company", label: "Billed to", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (row) => <Badge value={row.status} /> },
  { key: "method", label: "Method", sortable: true },
  { key: "issuedAt", label: "Issued", sortable: true, render: (row) => formatDate(row.issuedAt) },
  { key: "dueAt", label: "Due", sortable: true, render: (row) => formatDate(row.dueAt) },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    align: "right",
    render: (row) => <span className="cell-primary">{formatCurrency(row.amount)}</span>,
  },
];

export default function InvoicesPage() {
  const table = useTable(listInvoices, { ordering: "-issuedAt" });

  return (
    <>
      <PageHeader
        title="Invoices"
        subtitle="Billing history and outstanding balances."
        actions={
          <button type="button" className="btn btn-secondary" onClick={() => toast.info("Wire this to your export endpoint")}>
            <Download size={16} />
            Export
          </button>
        }
      />

      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        searchPlaceholder="Search by invoice number or company…"
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
        empty={{ icon: FileText, title: "No invoices found", message: "Try a different search term." }}
      />
    </>
  );
}

InvoicesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
