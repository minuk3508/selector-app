import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import { MoneyIcon } from "../../../components/Icons";
import { GetWinnings } from "../../../api/winning";
import { useRecoilState } from "recoil";
import { winningsAtom } from "../../../states/atoms/winnings.atom";

const Winnings = () => {
  const [winning, setWinning] = useRecoilState(winningsAtom);

  const renderWinnings = async () => {
    const res = await GetWinnings();
    if (res?.winings !== null || res?.winings === undefined) {
      setWinning(10000 + res.winings);
    }
  };
  console.log(winning);
  const NumberToLocaleString = (coin: string | number) => {
    let tempCoin = coin;
    if (isNaN(Number(tempCoin))) {
      return coin;
    } else {
      tempCoin = Number(coin);
    }

    return tempCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    renderWinnings();
  }, []);
  return (
    <Square>
      <IconBox>
        <MoneyIcon />
      </IconBox>
      <ContentsBox>
        <Label>당첨금</Label>
        <Contents>{`${NumberToLocaleString(winning)}원`}</Contents>
      </ContentsBox>
    </Square>
  );
};

export default Winnings;

const Square = styled.View`
  width: 100%;
  flex-direction: row;
  padding: ${wp(10)}px ${wp(15)}px;
  border-radius: ${wp(10)}px;
`;
const IconBox = styled.View`
  justify-content: center;
  align-items: center;
  width: ${wp(40)}px;
  height: ${wp(40)}px;
`;
const ContentsBox = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px ${wp(8)}px;
`;
const Label = styled.Text`
  color: #929292;
  font-size: ${wp(12)}px;
  font-weight: 700;
`;
const Contents = styled.Text`
  color: #ffffff;
  font-size: ${wp(17)}px;
  font-weight: 900;
`;
