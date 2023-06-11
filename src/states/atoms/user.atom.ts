import { atom } from "recoil";

export interface CustomUser {
  uid: string | null;
  name: string | null;
  birth: string | null;
  email: string | null;
  phone: string | null;
  account: any[] | null;
}

export const userAtom = atom<CustomUser>({
  key: "userInfo",
  default: {
    uid: null,
    name: null,
    birth: null,
    email: null,
    phone: null,
    account: null,
  },
});
