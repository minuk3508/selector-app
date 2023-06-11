import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home, { HomeProps } from "../../screen/home/home.screen";
import { NavigationContainer } from "@react-navigation/native";
import Ads from "../../screen/ads/ad.screen";
import Account from "../../screen/account/account.screen";
type AccountStackParamList = {
  account: any;
};
const AccountNavigator = () => {
  const Stack = createNativeStackNavigator<AccountStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account">{() => <Account />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountNavigator;
