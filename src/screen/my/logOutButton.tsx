import React from "react";
import styled from "styled-components/native";
import { wp } from "../../utils/ui";
import auth from "@react-native-firebase/auth";

const LogOutButton = () => {
  return (
    <Wrapper>
      <Button
        onPress={async () => {
          auth().signOut();
        }}>
        <ButtonText>로그아웃</ButtonText>
      </Button>
    </Wrapper>
  );
};

export default LogOutButton;
const Wrapper = styled.View`
  flex: 1;
  padding-left: ${wp(75)}px;
  padding-right: ${wp(75)}px;
  margin-top: ${wp(40)}px;
  margin-bottom: ${wp(40)}px;
`;
const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #3e3e3e;
  border-radius: 10px;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
`;
