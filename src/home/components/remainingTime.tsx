import moment from 'moment';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

export default function RemainingTime() {
  const [hours, setHours] = useState<string>();
  const [min, setMin] = useState<string>();
  const [sec, setSec] = useState<string>();

  const updateRemainingTime = () => {
    const now = moment();
    const tomorrow = moment().add(1, 'day').startOf('day').add(21, 'hours');
    const today = moment().startOf('day').add(21, 'hours');
    const tomorrowDiff = moment.duration(tomorrow.diff(now));
    const todayDiff = moment.duration(today.diff(now));
    if (tomorrowDiff.asHours() < 24) {
      const hours = Math.floor(tomorrowDiff.asHours()).toString().padStart(2, '0');
      const minutes = tomorrowDiff.minutes().toString().padStart(2, '0');
      setHours(hours);
      setMin(minutes);
    } else {
      const hours = Math.floor(todayDiff.asHours()).toString().padStart(2, '0');
      const minutes = todayDiff.minutes().toString().padStart(2, '0');
      const sec = todayDiff.seconds().toString().padStart(2, '0');
      setSec(sec);
      setHours(hours);
      setMin(minutes);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
