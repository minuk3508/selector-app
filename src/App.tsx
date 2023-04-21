import React, {useEffect, useState} from 'react';
import AuthScreen from './auth/auth.screen';
import auth from '@react-native-firebase/auth';
import {StatusBar, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import moment from 'moment';

export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [hours, setHours] = useState<string>();
  const [min, setMin] = useState<string>();
  const [tick, setTick] = useState<boolean>(true);
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  const tickTok = () => {
    setTick(prev => !prev);
  };
  const updateRemainingTime = () => {
    const now = moment();
    const tomorrow = moment().add(1, 'day').startOf('day').add(21, 'hours');
    const diff = moment.duration(tomorrow.diff(now)); // 두 시간의 차이 계산
    const hours = Math.floor(diff.asHours()); // 시간 차이 계산
    const minutes = diff.minutes(); // 분 차이 계산
    const toStringHour = hours.toString().padStart(2, '0');
    const toStringMin = minutes.toString().padStart(2, '0');
    setHours(toStringHour);
    setMin(toStringMin);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    const intervalTick = setInterval(() => {
      tickTok();
    }, 1000);
    return () => {
      clearInterval(intervalTick);
      clearInterval(intervalId);
    };
  }, []);

  // const formattedDiff = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  if (initializing) return null;
  if (!user) {
    return <AuthScreen />;
  }
  // console.log(`${hours}:${min}`);
  console.log(tick ? 'tick' : 'tok');
  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
      <HeaderWrapper></HeaderWrapper>
      <MainWrapper>
        <Box>
          <BoxHeader>
            <BoxTitle>📍 매일 밤 9️⃣시, 티켓을 뽑습니다 </BoxTitle>
          </BoxHeader>
          <BoxMain></BoxMain>
        </Box>
      </MainWrapper>
      <FooterWrapper></FooterWrapper>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
const HeaderWrapper = styled.View`
  width: 100%;
  height: 7%;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid white;
`;
const MainWrapper = styled.View`
  width: 100%;
  height: 70%;
  padding: 20px;
`;
const Box = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #2d2c34;
  border-radius: 8px;
`;
const BoxHeader = styled.View`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;
const BoxMain = styled.View`
  width: 100%;
  height: auto;
  border: 1px solid white;
`;

const BoxTitle = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 900;
`;
const FooterWrapper = styled.View`
  width: 100%;
  height: 23%;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid white;
`;
