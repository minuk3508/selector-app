import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import AuthScreen from "./screen/auth/auth.screen";
import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import useInitialUserInfo from "./states/stateHooks/useInitialUserInfo";
import useInitialTotalTickets from "./states/stateHooks/useInitialTotalTickets";
import Root from "./navigator/root";

export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const { userInfo, userInfoSet } = useInitialUserInfo();
  const { total, totalTicketSet } = useInitialTotalTickets();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    userInfoSet(user);
    totalTicketSet(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);
  console.log(initializing);
  return (
    <RecoilRoot>
      {initializing ? null : !userInfo ? (
        <AuthScreen />
      ) : (
        <Root userInfo={userInfo} totalTickets={total} />
      )}
    </RecoilRoot>
  );
}
