import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home, { HomeProps } from "../../screen/home/home.screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import My from "../../screen/my/my.screen";

const HomeNavigator = ({ userInfo, totalTickets }: HomeProps) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#2d2c34",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="main"
        options={{
          tabBarLabel: "메인",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home-filled" color={color} size={size} />;
          },
        }}>
        {() => <Home userInfo={userInfo} totalTickets={totalTickets} />}
      </Tab.Screen>
      <Tab.Screen
        name="my"
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="person-pin" color={color} size={size} />;
          },
        }}>
        {() => <My />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeNavigator;
