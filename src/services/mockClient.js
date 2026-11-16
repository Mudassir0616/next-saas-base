/**
 * Mock transport for the sample data that each service file keeps at its top.
 * Delete this file once every service calls the real API instead (see
 * "Going live with a real API" in the README).
 */

const LATENCY_MS = 260;
const DAY_MS = 86_400_000;

export const delay = (ms = LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Dates relative to now, so sample rows never look stale ("3d ago" stays "3d
 * ago"). Fractions work too: daysAgo(0.1) is about 2.4 hours ago.
 */
export const daysAgo = (days) => new Date(Date.now() - days * DAY_MS).toISOString();
export const daysAhead = (days) => new Date(Date.now() + days * DAY_MS).toISOString();

const compare = (a, b) => {
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true });
};

/**
 * Filters, sorts and paginates an in-memory array, returning the same envelope
 * the real (DRF-style) API returns.
 *
 * @param {object[]} collection
 * @param {{page?: number, pageSize?: number, search?: string, ordering?: string, filters?: object}} params
 * @param {{searchFields?: string[]}} options
 */
export const mockList = async (collection, params = {}, options = {}) => {
  const { page = 1, pageSize = 10, search = "", ordering = "", filters = {} } = params;
  const { searchFields = [] } = options;

  await delay();

  let rows = [...collection];

  const term = search.trim().toLowerCase();
  if (term && searchFields.length) {
    rows = rows.filter((row) =>
      searchFields.some((field) => String(row[field] ?? "").toLowerCase().includes(term))
    );
  }

  for (const [field, value] of Object.entries(filters)) {
    if (value === "" || value == null) continue;
    rows = rows.filter((row) => row[field] === value);
  }

  if (ordering) {
    const desc = ordering.startsWith("-");
    const field = desc ? ordering.slice(1) : ordering;
    rows.sort((a, b) => (desc ? compare(b[field], a[field]) : compare(a[field], b[field])));
  }

  const count = rows.length;
  const start = (page - 1) * pageSize;

  return {
    count,
    next: start + pageSize < count ? page + 1 : null,
    previous: page > 1 ? page - 1 : null,
    results: rows.slice(start, start + pageSize),
  };
};

export const mockOne = async (collection, id) => {
  await delay(160);
  const record = collection.find((row) => String(row.id) === String(id));
  if (!record) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  return record;
};

/** Mutations are not persisted — they only resolve so the UI flow is complete. */
export const mockMutate = async (payload) => {
  await delay(320);
  return payload;
};
