import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Platform, StatusBar, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import RemainingTime from "./components/remainingTime";
import Icon from "react-native-vector-icons/Ionicons";
import Zzz from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { Availability, getAds } from "../../api/ticket";
import { useNavigation } from "@react-navigation/native";
import { CustomAd, adAtom } from "../../states/atoms/ads.atom";
import { TotalTicket } from "../../states/stateHooks/useInitialTotalTickets";
import useRemainingTime from "../../states/stateHooks/useRemainingTime";
import { totalTicketAtom } from "../../states/atoms/ticket.atom";
import Loading from "../../utils/loading";
export type HomeProps = {
  userInfo: CustomUser;
  totalTickets: TotalTicket;
};

export default function Home(props: HomeProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState<CustomUser>(userAtom);
  const [total, setTotal] = useRecoilState<TotalTicket>(totalTicketAtom);
  const { hours } = useRemainingTime();
  const [ad, setAd] = useRecoilState<CustomAd>(adAtom);
  const [onSetting, setOnSetting] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setUser(props.userInfo);
  }, [props.userInfo, setUser]);
  useEffect(() => {
    setTotal(props.totalTickets);
  }, [props.totalTickets]);
  return (
    <>
      <Container>
        <StatusBar barStyle={"light-content"} />
        <HeaderWrapper>
          <TitleBox>
            <TitleText>Ticketty</TitleText>
            <IconFontAwesome5 name="comment-dollar" color={"#69ff78"} size={23} />
          </TitleBox>
          <ButtonWrapper>
            <SettingButton
              onPress={() => {
                setOnSetting(prev => !prev);
              }}>
              <Icon name="settings-sharp" color={"#5f5f5f"} size={23} />
            </SettingButton>
            {onSetting ? (
              <Menu style={boxShdowStyles.shadow}>
                <MenuItem>
                  <MenuButton
                    onPress={() => {
                      navigation.navigate("My" as never);
                    }}>
                    <MenuButtonText>마이페이지</MenuButtonText>
                  </MenuButton>
                </MenuItem>
                <MenuItem>
                  <MenuButton
                    onPress={() => {
                      auth().signOut();
                    }}>
                    <MenuButtonText>로그아웃</MenuButtonText>
                  </MenuButton>
                </MenuItem>
              </Menu>
            ) : null}
          </ButtonWrapper>
        </HeaderWrapper>
        <MainWrapper>
          <RemainingTime />
          <Box>
            <BoxHeader>
              <BoxTitle>📍 뽑힌 티켓의 소유자에게는 현금을 드릴게요 💸</BoxTitle>
            </BoxHeader>
            <BoxMain>
              <TextBox>
                <RemainText>준비된 당첨금은</RemainText>
              </TextBox>
              <HourBox>
                <TimeText>50,000원</TimeText>
              </HourBox>
              <TextBox>
                <RemainText>입니다</RemainText>
              </TextBox>
            </BoxMain>
            {user.account === null ? (
              <BoxHeader>
                <BoxTitle>📍 계좌를 알아야 당첨금을 줄 수 있어요</BoxTitle>
              </BoxHeader>
            ) : null}
            <AccountResister
              onPress={() => {
                navigation.navigate("My" as never);
              }}>
              <BlackText>계좌 등록하기</BlackText>
            </AccountResister>
          </Box>
          <Box>
            <BoxHeader>
              <BoxTitle>📍 티켓이 뽑히면 그날 발행된 티켓은 리셋🔄됩니다.</BoxTitle>
            </BoxHeader>
            <BoxSub>
              <TextBox>
                <RemainText>👩‍👩‍👧‍👧 리셋 후 지금까지 발행된 티켓은</RemainText>
              </TextBox>
            </BoxSub>
            <BoxMain>
              <HourBox>
                <TimeText>{total.total}장</TimeText>
              </HourBox>
            </BoxMain>
            <BoxSub>
              <TextBox>
                <RemainText>{`👤 ${
                  user.name ? user.name : "사용자"
                }님이 보유한 티켓은`}</RemainText>
              </TextBox>
            </BoxSub>
            <BoxMain>
              <HourBox>
                <TimeText>{total.total_currentUser}장</TimeText>
              </HourBox>
            </BoxMain>
            <BoxSub>
              <TextBox>
                <RemainText>당첨 확률은 약 </RemainText>
              </TextBox>
              <HourBox>
                <TimeText>
                  {total.total_currentUser === 0
                    ? "0%"
                    : `${((total.total_currentUser / total.total) * 100).toFixed(2)}%`}
                </TimeText>
              </HourBox>
              <TextBox>
                <RemainText>가 되겠네요</RemainText>
              </TextBox>
            </BoxSub>
          </Box>
          <Box>
            <BoxHeader>
              <BoxTitle>📍 리셋된 티켓은 토큰으로 데이터에 저장해 놓을게요</BoxTitle>
            </BoxHeader>
            <BoxSub>
              <TextBox>
                <RemainText>그 토큰이 뭐든 쓰일날이 오겠죠?🤡</RemainText>
              </TextBox>
            </BoxSub>
          </Box>
          <Empty />
        </MainWrapper>
        <FooterWrapper>
          <TicketButtonWrapper>
            {Number(hours) > 22 ? (
              <GetTicketButton onPress={async () => {}}>
                <ButtonText>
                  <Zzz name="sleep" size={35} color={"#69ff78"} />
                </ButtonText>
              </GetTicketButton>
            ) : (
              <GetTicketButton
                onPress={async () => {
                  setLoading(true);
                  const isAvailability = await Availability();

                  if (isAvailability && user.uid) {
                    await getAds({ userUid: user.uid })
                      .then(res => {
                        setAd({ contents: res });
                        console.log(res);
                      })
                      .then(() => {
                        setLoading(false);
                        navigation.navigate("ads" as never);
                      });
                  }
                }}>
                <ButtonText>티켓 생성하기</ButtonText>
              </GetTicketButton>
            )}
          </TicketButtonWrapper>
        </FooterWrapper>
      </Container>
      {loading ? <Loading /> : null}
    </>
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
  width: 100%;
  height: 70%;
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
  background-color: #ffffff;

  border: 4px solid #3a3a3a;
  /* border-style: ; */
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
  color: #3a3a3a;
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
  color: #3a3a3a;
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
