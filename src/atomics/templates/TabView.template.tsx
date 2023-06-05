import React, { ReactNode } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import IconFont from "react-native-vector-icons/FontAwesome5";
import { wp } from "../../utils/ui";

const TabView = ({ children }: { children: ReactNode }) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <Container>
      <HeaderWrapper>
        <StatusBar barStyle={"light-content"} />
        <TitleBox>
          <TitleText>Ticketty</TitleText>
          <IconFont name="comment-dollar" color={"#44e954"} size={wp(23)} />
          <Versions>beta</Versions>
        </TitleBox>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
      <BottomTabSpace BottomHeight={tabBarHeight} />
    </Container>
  );
};

export default TabView;

const Container = styled.View`
  position: relative;
  flex: 1;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
const HeaderWrapper = styled.SafeAreaView`
  position: relative;
  padding-left: ${wp(20)}px;
  padding-right: ${wp(20)}px;
`;
const MainWrapper = styled.ScrollView`
  flex: 1;
`;
const TitleBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TitleText = styled.Text`
  color: #5f5f5f;
  font-weight: 900;
  font-size: ${wp(23)}px;
  margin-bottom: ${wp(1)}px;
  padding-right: ${wp(5)}px;
`;
const Versions = styled.Text`
  color: #5f5f5f;
  font-weight: 900;
  font-size: ${wp(12)}px;
  margin-left: ${wp(8)}px;
  margin-bottom: ${wp(1)}px;
  padding-right: ${wp(5)}px;
`;
const BottomTabSpace = styled.View<{ BottomHeight: number }>`
  height: ${({ BottomHeight }) => `${BottomHeight}`}px;
`;
