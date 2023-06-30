import api from "../api";

export const GetWinnings = async () => {
  const res = await api.post("/getWinings");
  return res;
};
export const GetWinner = async () => {
  const res = await api.post("/getWinner");
  return res;
};
