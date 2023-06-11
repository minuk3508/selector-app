import api from "../api";

export const getUser = async (body: { uid: string | null; name?: string | null }) => {
  const res = await api.post("/getUser", body);
  return res;
};

export const editUser = async (body: {
  uid: string;
  name: string | null;
  birth: string | null;
  email: string | null;
  phone: string | null;
  account: object | null;
}) => {
  const res = await api.post("/editUser", body);
  return res;
};
