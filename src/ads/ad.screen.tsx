import React, { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/Ionicons";
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
        <BottomWrapper>
          <GoogleButton
            underlayColor="#fca2a2"
            onPress={async () => {
              if (user.uid && time) {
                await stampUser({ userUid: user.uid, timeStamp: time }).then(() => {
                  navigate.goBack();
                });
              }
            }}>
            <ButtonWrapper>
              <TextBox>
                <ButtonText>티켓 받기</ButtonText>
              </TextBox>
            </ButtonWrapper>
          </GoogleButton>
        </BottomWrapper>
      ) : (
        <Text>티켓 생성중...</Text>
      )}
    </Container>
  );
}
const Container = styled.SafeAreaView`
  position: relative;
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
const TopWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const BottomWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 50%;
`;

const GoogleButton = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  margin-top: 10px;
  border-radius: 7px;
  background-color: #e34343;
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
  font-weight: 700;
  font-size: 13px;
`;
