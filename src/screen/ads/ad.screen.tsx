import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/AntDesign";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { stampUser } from "../../api/ticket";
import { useNavigation } from "@react-navigation/native";
import useUpdateTotalTickets from "../../states/stateHooks/useUpdateTotalTickets";
import Loading from "../../utils/loading";

export default function Ads(): JSX.Element {
  const [user] = useRecoilState<CustomUser>(userAtom);
  const [loading, setLoading] = useState(false);
  const { totalTicketSet } = useUpdateTotalTickets();
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

  const getTicket = async () => {
    setLoading(true);
    if (user.uid && time) {
      await stampUser({ userUid: user.uid, timeStamp: time });
      await totalTicketSet(user).then(() => {
        setLoading(false);
        navigate.goBack();
      });
    }
  };
  return (
    <>
      <Container>
        <StatusBar barStyle={"light-content"} />
        {showMessage ? (
          <>
            <TopWrapper>
              <Icon name="circledown" color={"#69ff78"} size={50} />
              <ComplateText>생성완료</ComplateText>
            </TopWrapper>
            <BottomWrapper>
              <GetTicketButton onPress={getTicket}>
                <ButtonText>티켓 받기</ButtonText>
              </GetTicketButton>
            </BottomWrapper>
          </>
        ) : (
          <>
            <TopWrapper>
              <ActivityIndicator size="large" color="#69ff78" />
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
      {loading ? <Loading /> : null}
    </>
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
