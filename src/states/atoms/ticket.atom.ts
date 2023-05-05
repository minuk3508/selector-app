import { atom } from "recoil";
import { TotalTicket } from "../stateHooks/useInitialTotalTickets";

export const totalTicketAtom = atom<TotalTicket>({
  key: "total_tickets",
  default: {
    total: 0,
    total_currentUser: 0,
  },
});
