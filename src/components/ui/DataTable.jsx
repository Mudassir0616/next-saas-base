import { ChevronLeft, ChevronRight, ChevronsUpDown, Search } from "lucide-react";
import EmptyState from "./EmptyState";

const pageWindow = (page, totalPages, span = 5) => {
  const start = Math.max(1, Math.min(page - Math.floor(span / 2), totalPages - span + 1));
  const length = Math.min(span, totalPages);
  return Array.from({ length }, (_, i) => start + i);
};

function SkeletonRows({ columns, rows = 8 }) {
  return Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {columns.map((column) => (
        <td key={column.key}>
          <span className="skeleton-line" style={{ display: "block", width: `${column.skeletonWidth ?? 70}%` }} />
        </td>
      ))}
    </tr>
  ));
}

export default function DataTable({
  columns,
  rows,
  loading,
  rowKey = (row) => row.id,

  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  toolbar,

  page,
  totalPages,
  count,
  pageSize,
  onPageChange,

  ordering,
  onSort,

  empty,
}) {
  const showToolbar = Boolean(onSearchChange || toolbar);
  const from = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, count);

  return (
    <div className="card">
      {showToolbar && (
        <div className="table-toolbar">
          {onSearchChange && (
            <div className="table-search">
              <Search size={16} />
              <input
                type="search"
                value={search}
                placeholder={searchPlaceholder}
                onChange={(event) => onSearchChange(event.target.value)}
                aria-label={searchPlaceholder}
              />
            </div>
          )}
          {toolbar && <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>{toolbar}</div>}
        </div>
      )}

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => {
                const isSorted = ordering === column.key || ordering === `-${column.key}`;
                const sortable = Boolean(column.sortable && onSort);
                const justify = column.align === "right" ? "flex-end" : undefined;

                const label = column.label || (
                  <span className="sr-only">{column.srLabel ?? "Actions"}</span>
                );

                return (
                  <th
                    key={column.key}
                    style={{ width: column.width, textAlign: column.align }}
                    aria-sort={
                      sortable
                        ? isSorted
                          ? ordering.startsWith("-")
                            ? "descending"
                            : "ascending"
                          : "none"
                        : undefined
                    }
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className="th-inner th-sort"
                        style={{ justifyContent: justify }}
                        onClick={() => onSort(column.key)}
                      >
                        {label}
                        <ChevronsUpDown size={13} style={{ opacity: isSorted ? 1 : 0.4 }} />
                      </button>
                    ) : (
                      <span className="th-inner" style={{ justifyContent: justify }}>
                        {label}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading && <SkeletonRows columns={columns} />}

            {!loading &&
              rows.map((row) => (
                <tr key={rowKey(row)}>
                  {columns.map((column) => (
                    <td key={column.key} style={{ textAlign: column.align }}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && rows.length === 0 && <EmptyState {...empty} />}
      </div>

      {!loading && count > 0 && (
        <div className="table-footer">
          <span>
            Showing {from}–{to} of {count}
          </span>

          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {pageWindow(page, totalPages).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className="page-btn"
                data-active={pageNumber === page}
                onClick={() => onPageChange(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              className="page-btn"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
