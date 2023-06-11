import { WithLocalSvg } from "react-native-svg";
import MoneySvg from "../../assets/images/money.svg";
import BankSvg from "../../assets/images/bank.svg";
import HourglassSvg from "../../assets/images/hourglass.svg";
import NonghyubSvg from "../../assets/images/nonghyub.svg";
import ShinhanSvg from "../../assets/images/shinhan.svg";
import ShinhyubSvg from "../../assets/images/shinhyub.svg";
import WooriSvg from "../../assets/images/woori.svg";
import KakaobankSvg from "../../assets/images/kakaobank.svg";
import TossSvg from "../../assets/images/toss.svg";
import HanaSvg from "../../assets/images/hana.svg";
import KBSvg from "../../assets/images/KB.svg";
import React from "react";

export const MoneyIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={MoneySvg} />;
};

export const BankIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={BankSvg} />;
};

export const HourglassIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={HourglassSvg} />;
};

export const NonghyubIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={NonghyubSvg} />;
};

export const ShinhanIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={ShinhanSvg} />;
};

export const ShinhyubIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={ShinhyubSvg} />;
};

export const WooriIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={WooriSvg} />;
};

export const KakaobankIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={KakaobankSvg} />;
};

export const TossIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={TossSvg} />;
};

export const HanaIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={HanaSvg} />;
};

export const KBIcon = () => {
  return <WithLocalSvg width={30} height={30} asset={KBSvg} />;
};
export const BankLogoIcon = ({ code }: { code: number }) => {
  switch (code) {
    case 0:
      return <KBIcon />;
    case 1:
      return <NonghyubIcon />;
    case 2:
      return <ShinhanIcon />;
    case 3:
      return <ShinhyubIcon />;
    case 4:
      return <WooriIcon />;
    case 5:
      return <KakaobankIcon />;
    case 6:
      return <TossIcon />;
    case 7:
      return <HanaIcon />;
    default:
      return <BankIcon />;
  }
};
