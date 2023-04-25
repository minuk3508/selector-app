import moment from 'moment';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import useRemainingTime from '../../states/stateHooks/useRemainingTime';

export default function RemainingTime() {
  const {hours, min, sec} = useRemainingTime();

  return (
    <Box>
      <BoxHeader>
        <BoxTitle>📍 매일 밤 9️⃣시, 1장의 티켓을 뽑습니다 </BoxTitle>
      </BoxHeader>
      <BoxMain>
        <HourBox>
          <TimeText>
            {hours === '00'
              ? `⏰ ${min ? min : '00'}분 ${sec ? sec : '00'}초`
              : `⏰ ${hours ? hours : '00'}시간 ${min ? min : '00'}분`}
          </TimeText>
        </HourBox>
        <TextBox>
          <RemainText>남았어요</RemainText>
        </TextBox>
      </BoxMain>
    </Box>
  );
}

const Box = styled.View`
  width: 100%;
  height: auto;
  padding: 20px;
  margin: 10px 0px;
  background-color: #2d2c34;
  border-radius: 8px;
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

const TimeText = styled.Text`
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
