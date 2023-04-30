import { useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { totalTicket } from "../../api/ticket";
export interface TotalTicket {
  total: number;
  total_currentUser: number;
}

const useInitialTotalTickets = () => {
  const [total, setTotal] = useState<TotalTicket>({ total: 0, total_currentUser: 0 });
  const totalTicketSet = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const totals = await totalTicket({ userUid: user.uid });
      setTotal(totals);
    } else {
      setTotal({ total: 0, total_currentUser: 0 });
    }
  };

  return { total, totalTicketSet };
};

export default useInitialTotalTickets;
