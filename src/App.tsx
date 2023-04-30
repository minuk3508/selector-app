import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import AuthScreen from "./auth/auth.screen";
import Home from "./home/home.screen";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import useInitialUserInfo from "./states/stateHooks/useInitialUserInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ads from "./ads/ad.screen";
import My from "./my/my.screen";
import { totalTicket } from "./api/ticket";
import useInitialTotalTickets from "./states/stateHooks/useInitialTotalTickets";
type RootStackParamList = {
  Home: any;
  Ads: any;
  My: any;
};
export default function App(): JSX.Element | null {
  const [initializing, setInitializing] = useState(true);
  const { userInfo, userInfoSet } = useInitialUserInfo();
  const { total, totalTicketSet } = useInitialTotalTickets();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    userInfoSet(user);
    totalTicketSet(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <RecoilRoot>
      {initializing ? null : !userInfo ? (
        <AuthScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {() => <Home userInfo={userInfo} totalTickets={total} />}
            </Stack.Screen>
            <Stack.Screen name="Ads">{() => <Ads />}</Stack.Screen>
            <Stack.Screen name="My">{() => <My />}</Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </RecoilRoot>
  );
}
