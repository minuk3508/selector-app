import { WithLocalSvg } from "react-native-svg";
import MoneySvg from "../../assets/images/money.svg";
import BankSvg from "../../assets/images/bank.svg";
import HourglassSvg from "../../assets/images/hourglass.svg";
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
