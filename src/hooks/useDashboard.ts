import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboardService";

import { useUiStore } from "@/store/uiStore";

export const dashboardKeys = {
  summary: (date: string) => ["dashboard", "summary", date] as const,
};

export function useDashboard() {
  const selectedDate = useUiStore((s) => s.selectedDateLabel);
  return useQuery({
    queryKey: dashboardKeys.summary(selectedDate),
    queryFn: ({ signal }) => dashboardService.fetchSummary(selectedDate, signal),
    staleTime: 60_000,
  });
}
