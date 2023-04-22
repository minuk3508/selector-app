import React, {useEffect, useState} from 'react';
import AuthScreen from './auth/auth.screen';
import auth from '@react-native-firebase/auth';
import Home from './home/home.screen';

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
  //파이어베이스 연결하는 동안 랜더링 방지를 위해 초기화 상태 유지
  //initializing === false => 초기화 종료 => 화면 랜더링
  if (initializing) return null;

  //user 로그인 여부확인
  if (!user) {
    return <AuthScreen />;
  }

  return <Home />;
}
