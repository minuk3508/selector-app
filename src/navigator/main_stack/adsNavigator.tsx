import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home, { HomeProps } from "../../screen/home/home.screen";
import { NavigationContainer } from "@react-navigation/native";
import Ads from "../../screen/ads/ad.screen";
type AdsStackParamList = {
  ads: any;
};
const AdsNavigator = () => {
  const Stack = createNativeStackNavigator<AdsStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ads">{() => <Ads />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default AdsNavigator;
