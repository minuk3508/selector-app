import React from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import { MoneyIcon } from "../../../components/Icons";

const Winnings = () => {
  return (
    <Square>
      <IconBox>
        <MoneyIcon />
      </IconBox>
      <ContentsBox>
        <Label>당첨금</Label>
        <Contents>50,000원</Contents>
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
