import { createTicket, getTickets } from "@/api/tickets";

export const ticketService = {
  async list(date?: string, signal?: AbortSignal) {
    return getTickets(date, signal);
  },
  async create(req: Parameters<typeof createTicket>[0]) {
    return createTicket(req);
  },
};
