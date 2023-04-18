import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/AntDesign';
import {StatusBar} from 'react-native';

const WEBCLIENT_ID =
  `1054375956199-ppe58unqgn5pbrnoc9uk8a09hv8oj62a.apps.googleusercontent.com` as const;

export default function AuthScreen(): JSX.Element {
  useEffect(() => {
    //Google SDK 초기화
    GoogleSignin.configure({
      webClientId: WEBCLIENT_ID,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
      <TopWrapper>
        <TitleBox>
          <TitleText>Selector</TitleText>
        </TitleBox>
      </TopWrapper>
      <BottomWrapper>
        <GoogleButton
          underlayColor="#fca2a2"
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(err => console.log(err))
          }>
          <ButtonWrapper>
            <IconBox>
              <IconText>
                <Icon name="googleplus" color={'white'} size={20} />
              </IconText>
            </IconBox>
            <TextBox>
              <ButtonText>Google Sign in</ButtonText>
            </TextBox>
          </ButtonWrapper>
        </GoogleButton>
      </BottomWrapper>
    </Container>
  );
}

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
const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
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
