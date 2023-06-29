import api from "../api";

export const GetWinnings = async () => {
  const res = await api.post("/getWinings");
  return res;
};
