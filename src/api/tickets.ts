import { apiRequest } from "@/lib/apiClient";
import type { CreateTicketRequest, Ticket } from "@/types";
import ticketsMock from "@/mock/tickets.json";

let mutableTickets = [...(ticketsMock as Ticket[])];

/** GET /api/tickets */
export function getTickets(date?: string, signal?: AbortSignal) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return apiRequest<Ticket[]>(`/tickets${query}`, {
    method: "GET",
    signal,
    mockResolver: () => mutableTickets,
  });
}

/** POST /api/tickets */
export function createTicket(req: CreateTicketRequest) {
  return apiRequest<Ticket>("/tickets", {
    method: "POST",
    body: req,
    mockResolver: (): Ticket => {
      const ticket: Ticket = {
        id: `tkt-${Date.now()}`,
        subject: req.subject,
        description: req.description,
        status: "open",
        priority: req.priority,
        deviceId: req.deviceId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mutableTickets = [ticket, ...mutableTickets];
      return ticket;
    },
  });
}
