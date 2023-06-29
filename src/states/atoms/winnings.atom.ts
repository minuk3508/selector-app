import { atom } from "recoil";

export const winningsAtom = atom<number>({
  key: "winnings",
  default: 10000,
});
