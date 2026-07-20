import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { deviceService } from "@/services/deviceService";
import type { DeviceListParams } from "@/types";

import { useUiStore } from "@/store/uiStore";

export const deviceKeys = {
  all: ["devices"] as const,
  list: (params: DeviceListParams) => ["devices", "list", params] as const,
  detail: (id: string) => ["devices", "detail", id] as const,
};

export function useDevices(params: DeviceListParams) {
  const selectedDate = useUiStore((s) => s.selectedDateLabel);
  const updatedParams = { ...params, date: selectedDate };
  return useQuery({
    queryKey: deviceKeys.list(updatedParams),
    queryFn: ({ signal }) => deviceService.list(updatedParams, signal),
    placeholderData: keepPreviousData,
  });
}

export function useDevice(id: string | undefined) {
  return useQuery({
    queryKey: deviceKeys.detail(id ?? ""),
    queryFn: ({ signal }) => deviceService.getById(id as string, signal),
    enabled: Boolean(id),
  });
}
