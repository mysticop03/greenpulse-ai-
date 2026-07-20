import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/ticketService";
import type { CreateTicketRequest } from "@/types";

import { useUiStore } from "@/store/uiStore";

export function useTickets() {
  const selectedDate = useUiStore((s) => s.selectedDateLabel);
  return useQuery({
    queryKey: ["tickets", "list", selectedDate],
    queryFn: ({ signal }) => ticketService.list(selectedDate, signal),
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateTicketRequest) => ticketService.create(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets", "list"] });
    },
  });
}
