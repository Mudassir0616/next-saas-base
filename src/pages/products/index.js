import { Boxes, Plus } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import useTable from "@/hooks/useTable";
import { listProducts } from "@/services/productsService";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";

const columns = [
  {
    key: "name",
    label: "Product",
    sortable: true,
    render: (row) => (
      <div>
        <div className="cell-primary">{row.name}</div>
        <div className="cell-sub">{row.sku}</div>
      </div>
    ),
  },
  { key: "category", label: "Category", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (row) => <Badge value={row.status} /> },
  {
    key: "stock",
    label: "Stock",
    sortable: true,
    align: "right",
    render: (row) => formatNumber(row.stock),
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
    align: "right",
    render: (row) => <span className="cell-primary">{formatCurrency(row.price)}</span>,
  },
  { key: "updatedAt", label: "Updated", sortable: true, render: (row) => formatDate(row.updatedAt) },
];

export default function ProductsPage() {
  const table = useTable(listProducts, { ordering: "name" });

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Everything you sell, and what is left in stock."
        actions={
          <button type="button" className="btn btn-primary" onClick={() => toast.info("Hook this up to your create form")}>
            <Plus size={16} />
            Add product
          </button>
        }
      />

      <DataTable
        columns={columns}
        rows={table.rows}
        loading={table.loading}
        search={table.search}
        onSearchChange={table.setSearch}
        searchPlaceholder="Search by name, SKU or category…"
        page={table.page}
        totalPages={table.totalPages}
        count={table.count}
        pageSize={table.pageSize}
        onPageChange={table.setPage}
        ordering={table.ordering}
        onSort={table.toggleSort}
        empty={{ icon: Boxes, title: "No products found", message: "Try a different search term." }}
      />
    </>
  );
}

ProductsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
