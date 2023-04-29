import { atom } from "recoil";

export interface CustomAd {
  contents: string | null;
}

export const adAtom = atom<CustomAd>({
  key: "ad",
  default: {
    contents: null,
  },
});
