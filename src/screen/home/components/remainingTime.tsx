import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useRemainingTime from "../../../states/stateHooks/useRemainingTime";
import Icon from "react-native-vector-icons/MaterialIcons";
import { wp } from "../../../utils/ui";
import { HourglassIcon } from "../../../components/Icons";
import Zzz from "react-native-vector-icons/MaterialCommunityIcons";
export default function RemainingTime() {
  const { hours, min, sec } = useRemainingTime();

  return (
    <Square>
      <IconBox>
        <HourglassIcon />
      </IconBox>
      <ContentsBox>
        {hours === "23" ? (
          <Zzz name="sleep" size={35} color={"#69ff78"} />
        ) : (
          <>
            <Label>남은시간</Label>
            <Contents>
              {hours === "00"
                ? `${min ? min : "00"}분 ${sec ? sec : "00"}초`
                : `${hours ? hours : "00"}시간 ${min ? min : "00"}분`}
            </Contents>
          </>
        )}
      </ContentsBox>
    </Square>
  );
}

const Square = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
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
const BoxHeader = styled.View`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;
const BoxMain = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding-left: 15px;
`;
const BoxTitle = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 900;
`;
const HourBox = styled.View`
  justify-content: flex-end;
  width: auto;
  height: auto;
  margin-right: 10px;
`;
const VoteBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-right: 10px;
`;

const TimeText = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 27px;
`;
const VoteText = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 27px;
`;
const TextBox = styled.View`
  justify-content: center;
  width: auto;
  height: auto;
`;
const RemainText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 15px;
`;
