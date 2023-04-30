import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CustomUser, userAtom } from "../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { Availability, stampUser } from "../api/ticket";
import { CustomAd, adAtom } from "../states/atoms/ads.atom";
import { useNavigation } from "@react-navigation/native";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";

export default function My(): JSX.Element {
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
      <HeaderWrapper>
        <TitleBox>
          <TitleText>Ticketty</TitleText>
          <IconFontAwesome5 name="comment-dollar" color={"#5f5f5f"} size={23} />
        </TitleBox>
        <ButtonWrapper>
          <SettingButton onPress={() => {}}>
            <Icon name="settings-sharp" color={"#5f5f5f"} size={23} />
          </SettingButton>
        </ButtonWrapper>
      </HeaderWrapper>
      <MainWrapper></MainWrapper>
    </Container>
  );
}
const AccountResister = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: white;
  margin-top: 10px;
  border-radius: 10px;
`;
const boxShdowStyles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
const MenuItem = styled.View`
  width: 100%;
  height: 25px;
`;
const MenuButtonText = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 12px;
`;
const MenuButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
const Menu = styled.View`
  position: absolute;
  top: 100%;
  right: 0px;
  width: 100px;
  height: auto;
  padding: 10px 20px;
  background-color: #2d2c34;
  border-radius: 8px;
  z-index: 3;
`;
const ButtonWrapper = styled.View`
  position: relative;
  z-index: 2;
`;
const SettingButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
const TitleBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;
const TitleText = styled.Text`
  color: #5f5f5f;
  font-weight: 900;
  font-size: 23px;
  margin-bottom: 1px;
  padding-right: 5px;
`;
const Empty = styled.View`
  width: 100%;
  height: 30px;
`;
const TicketButtonWrapper = styled.View`
  width: 100%;
  height: auto;
  padding: 20px 35px;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
`;
const GetTicketButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #3e3e3e;
  border-radius: 10px;
`;
const Container = styled.SafeAreaView`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
const HeaderWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 3px;

  z-index: 3;
`;
const MainWrapper = styled.ScrollView`
  flex: 1;
  padding: 0px 20px;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 15%;
  padding-left: 20px;
  padding-right: 20px;
`;
const Box = styled.View`
  width: 100%;
  height: auto;
  margin-bottom: 35px;
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
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  padding-left: 20px;
  margin-bottom: 40px;
`;
const BoxSub = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding-left: 15px;
  margin-top: 10px;
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
  margin-right: 10px;
`;
const RemainText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 15px;
`;
const BlackText = styled.Text`
  color: #2d2c34;
  font-weight: 900;
  font-size: 15px;
`;
