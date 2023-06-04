import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeProps } from "../screen/home/home.screen";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./main_stack/homeNavigator";
import AdsStack from "./main_stack/adsNavigator";
type RootStackParamList = {
  ads: any;
  root: any;
};
const Root = ({ userInfo, totalTickets }: HomeProps) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="root">
          {() => <HomeNavigator userInfo={userInfo} totalTickets={totalTickets} />}
        </Stack.Screen>
        <Stack.Screen name="ads">{() => <AdsStack />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
