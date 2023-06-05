import { useState } from "react";
import { totalTicket } from "../../api/ticket";
export interface TotalTicket {
  total: number;
  total_currentUser: number;
}

const useInitialTotalTickets = () => {
  const [total, setTotal] = useState<TotalTicket>({ total: 0, total_currentUser: 0 });
  const totalTicketSet = async (userUid: string | null) => {
    if (userUid) {
      const totals = await totalTicket({ userUid });
      setTotal(totals);
    } else {
      setTotal({ total: 0, total_currentUser: 0 });
    }
  };

  return { total, totalTicketSet };
};

export default useInitialTotalTickets;
