import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/AntDesign";
import { CustomUser, userAtom } from "../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { Availability, stampUser } from "../api/ticket";
import { CustomAd, adAtom } from "../states/atoms/ads.atom";
import { useNavigation } from "@react-navigation/native";

export default function Ads(): JSX.Element {
  const [ad] = useRecoilState<CustomAd>(adAtom);
  const [user] = useRecoilState<CustomUser>(userAtom);
  const [showMessage, setShowMessage] = useState(false);
  const [time, setTime] = useState<number>(0);
  const navigate = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(true);
    }, 15000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    setTime(new Date().getTime());
  }, []);
  return (
    <Container>
      <StatusBar barStyle={"light-content"} />
      {showMessage ? (
        <>
          <TopWrapper>
            <Icon name="circledown" color={"#5f5f5f"} size={50} />
            <ComplateText>생성완료</ComplateText>
          </TopWrapper>
          <BottomWrapper>
            <GetTicketButton
              onPress={async () => {
                if (user.uid && time) {
                  await stampUser({ userUid: user.uid, timeStamp: time }).then(() => {
                    navigate.goBack();
                  });
                }
              }}>
              <ButtonText>티켓 받기</ButtonText>
            </GetTicketButton>
          </BottomWrapper>
        </>
      ) : (
        <>
          <TopWrapper>
            <ActivityIndicator size="large" color="#5f5f5f" />
            <ComplateText>티켓 생성중...</ComplateText>
          </TopWrapper>
          <BottomWrapper>
            <DisabledButton disabled={true} onPress={async () => {}}>
              <ButtonText>티켓 받기</ButtonText>
            </DisabledButton>
          </BottomWrapper>
        </>
      )}
    </Container>
  );
}
const TopWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 20px;
`;
const BottomWrapper = styled.View`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const Container = styled.SafeAreaView`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
const TitleBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;
const TitleText = styled.Text`
  color: #d5d5d5;
  font-weight: 900;
  font-size: 65px;
`;

const GetTicketButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  margin-top: 10px;
  border-radius: 7px;
  background-color: #3e3e3e;
`;
const DisabledButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  margin-top: 10px;
  border-radius: 7px;
  background-color: #3e3e3e;
  opacity: 0.2;
`;
const ButtonWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const IconBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  border-radius: 10px;
`;
const TextBox = styled.View`
  justify-content: center;
  width: 70%;
  height: 100%;
`;
const IconText = styled.Text`
  color: whitesmoke;
  font-weight: 700;
  font-size: 19px;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
`;
const ComplateText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
  margin-top: 10px;
`;
