import { useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { totalTicket } from "../../api/ticket";
import { useRecoilState } from "recoil";
import { totalTicketAtom } from "../atoms/ticket.atom";
import { CustomUser } from "../atoms/user.atom";
export interface TotalTicket {
  total: number;
  total_currentUser: number;
}

const useUpdateTotalTickets = () => {
  const [total, setTotal] = useRecoilState<TotalTicket>(totalTicketAtom);
  const totalTicketSet = async (user: CustomUser) => {
    if (user.uid) {
      const totals = await totalTicket({ userUid: user.uid });
      setTotal(totals);
    } else {
      setTotal({ total: 0, total_currentUser: 0 });
    }
  };

  return { total, totalTicketSet };
};

export default useUpdateTotalTickets;
