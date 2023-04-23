import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RemainingTime from './components/remainingTime';
import Icon from 'react-native-vector-icons/Ionicons';
import {addUser, getUser} from '../api/user';

export default function Home(): JSX.Element {
  const [onSetting, setOnSetting] = useState(false);
  const [user, setUser] = useState<{
    uid: string;
    name: string | null;
    birth: string | null;
    email: string | null;
    phone: string | null;
    account: object | null;
  }>();
  const init = async () => {
    const currentUser = auth().currentUser?.uid;
    const currentUserName = auth().currentUser?.displayName;
    const currentUserEmail = auth().currentUser?.email;
    if (currentUser) {
      const user = await getUser({uid: currentUser});
      if (user === '') {
        await addUser({
          uid: currentUser,
          name: currentUserName ? currentUserName : null,
          birth: null,
          email: currentUserEmail ? currentUserEmail : null,
          phone: null,
          account: null,
        }).then(() => {
          const newUser = getUser({uid: currentUser});
          console.log(newUser);
        });
      }
      setUser(user);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
      <HeaderWrapper>
        <TitleBox>
          <TitleText>Selector</TitleText>
        </TitleBox>
        <ButtonWrapper>
          <SettingButton
            onPress={() => {
              setOnSetting(prev => !prev);
            }}>
            <Icon name="settings-sharp" color={'#5f5f5f'} size={23} />
          </SettingButton>
          {onSetting ? (
            <Menu style={boxShdowStyles.shadow}>
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
        </Box>
        <Box>
          <BoxHeader>
            <BoxTitle>📍 티켓이 뽑히면 그날 발행된 티켓은 리셋🔄됩니다. </BoxTitle>
          </BoxHeader>
          <BoxSub>
            <TextBox>
              <RemainText>👩‍👩‍👧‍👧 리셋 후 지금까지 발행된 티켓은</RemainText>
            </TextBox>
          </BoxSub>
          <BoxMain>
            <HourBox>
              <TimeText>0장</TimeText>
            </HourBox>
          </BoxMain>
          <BoxSub>
            <TextBox>
              <RemainText>{`👤 ${user?.name ? user?.name : '사용자'}님이 보유한 티켓은`}</RemainText>
            </TextBox>
          </BoxSub>
          <BoxMain>
            <HourBox>
              <TimeText>0장</TimeText>
            </HourBox>
          </BoxMain>
          <BoxSub>
            <TextBox>
              <RemainText>그래서 당첨 확률은 약 </RemainText>
            </TextBox>
            <HourBox>
              <TimeText>0%</TimeText>
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
          <GetTicketButton>
            <ButtonText>티켓 생성하기</ButtonText>
          </GetTicketButton>
        </TicketButtonWrapper>
      </FooterWrapper>
    </Container>
  );
}
const boxShdowStyles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
  width: 200px;
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
  background-color: #252525;
`;
const TitleBox = styled.View`
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
