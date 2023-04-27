import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import AuthScreen from "./auth/auth.screen";
import Home from "./home/home.screen";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import useInitialUserInfo from "./states/stateHooks/useInitialUserInfo";

export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const { userInfo, userInfoSet } = useInitialUserInfo();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    userInfoSet(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <RecoilRoot>
      {initializing ? null : !userInfo ? <AuthScreen /> : <Home userInfo={userInfo} />}
    </RecoilRoot>
  );
}
