import { apiRequest } from "@/lib/apiClient";
import type { DashboardSummary } from "@/types";
import dashboardMock from "@/mock/dashboard.json";

/** GET /api/dashboard */
export function getDashboardSummary(date?: string, signal?: AbortSignal) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return apiRequest<DashboardSummary>(`/dashboard${query}`, {
    method: "GET",
    signal,
    mockResolver: () => dashboardMock as DashboardSummary,
  });
}
