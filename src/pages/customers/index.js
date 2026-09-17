import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useTable from "@/hooks/useTable";
import { deleteCustomer, listCustomers } from "@/services/customersService";
import { formatCurrency, formatDate } from "@/lib/format";

export default function CustomersPage() {
  const table = useTable(listCustomers, { ordering: "-createdAt" });
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCustomer(pendingDelete.id);
      toast.success(`${pendingDelete.name} removed`);
      setPendingDelete(null);
      table.refresh();
    } catch {
      // ApiClient already surfaces the message; keep the dialog open to retry.
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Customer",
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
    { key: "company", label: "Company", sortable: true },
    { key: "plan", label: "Plan", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (row) => <Badge value={row.status} /> },
    {
      key: "mrr",
      label: "MRR",
      sortable: true,
      align: "right",
      render: (row) => <span className="cell-primary">{formatCurrency(row.mrr)}</span>,
    },
    { key: "createdAt", label: "Created", sortable: true, render: (row) => formatDate(row.createdAt) },
    {
      key: "actions",
      label: "",
      width: 60,
      align: "right",
      render: (row) => (
        <div className="cell-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setPendingDelete(row)}
            aria-label={`Delete ${row.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Everyone using your product, across every plan."
        actions={
          <button type="button" className="btn btn-primary" onClick={() => toast.info("Hook this up to your create form")}>
            <Plus size={16} />
            Add customer
          </button>
        }
      />

      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        searchPlaceholder="Search by name, email or company…"
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
        empty={{ icon: Users, title: "No customers found", message: "Try a different search term." }}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete customer?"
        message={`${pendingDelete?.name} will be permanently removed from your workspace.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={handleDelete}
        onClose={() => setPendingDelete(null)}
      />
    </>
  );
}

CustomersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
