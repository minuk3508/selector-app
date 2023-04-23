import api from '../api';

export const getUser = async (body: {uid: string}) => {
  const res = await api.post('/getUser', body);
  return res;
};

export const addUser = async (body: {
  uid: string;
  name: string | null;
  birth: string | null;
  email: string | null;
  phone: string | null;
  account: object | null;
}) => {
  const res = await api.post('/addUser', body);
  return res;
};
