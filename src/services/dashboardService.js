import { dashboard } from "@/mock/dashboard";
import { delay } from "./mockClient";
// import { dashboardApi } from "./endpoints";

/** One call returns everything the dashboard renders. */
export const getDashboard = async () => {
  // return dashboardApi.get("/summary/");

  await delay(380);
  return dashboard;
};
