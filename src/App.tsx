import React, {useEffect, useState} from 'react';
import AuthScreen from './auth/auth.screen';
import auth from '@react-native-firebase/auth';
import {StatusBar, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (!user) {
    return <AuthScreen />;
  }
  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
