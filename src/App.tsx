import React, {useEffect, useState} from 'react';
import AuthScreen from './auth/auth.screen';
import auth from '@react-native-firebase/auth';
import Home from './home/home.screen';
import {RecoilRoot} from 'recoil';

export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState();

  function onAuthStateChanged(user: any) {
    setIsAuthenticated(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  //파이어베이스 연결하는 동안 랜더링 방지를 위해 초기화 상태 유지
  //initializing === false => 초기화 종료 => 화면 랜더링
  return (
    <RecoilRoot>
      {initializing ? null : !isAuthenticated ? <AuthScreen /> : <Home />}
    </RecoilRoot>
  );
}
