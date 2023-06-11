import {
  HanaIcon,
  KBIcon,
  KakaobankIcon,
  NonghyubIcon,
  ShinhanIcon,
  ShinhyubIcon,
  TossIcon,
  WooriIcon,
} from "../components/Icons";

export enum Banks {
  국민,
  농협,
  신한,
  신협,
  우리,
  카카오,
  토스,
  하나,
}

export type Bank = {
  code: Banks;
  name: string;
  logo: () => JSX.Element;
};

export const bankData: Bank[] = [
  { code: Banks.국민, name: "KB국민은행", logo: KBIcon },
  { code: Banks.농협, name: "농협은행", logo: NonghyubIcon },
  { code: Banks.신한, name: "신한은행", logo: ShinhanIcon },
  { code: Banks.신협, name: "신협은행", logo: ShinhyubIcon },
  { code: Banks.우리, name: "우리은행", logo: WooriIcon },
  { code: Banks.카카오, name: "카카오뱅크", logo: KakaobankIcon },
  { code: Banks.토스, name: "토스뱅크", logo: TossIcon },
  { code: Banks.하나, name: "하나은행", logo: HanaIcon },
];
