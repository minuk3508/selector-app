import React from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import { BankIcon } from "../../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { CustomUser, userAtom } from "../../../states/atoms/user.atom";
import { useRecoilState } from "recoil";

const Banks = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState<CustomUser>(userAtom);

  return (
    <>
      <Square>
        <IconBox>
          <BankIcon />
        </IconBox>
        <ContentsBox>
          <Label>계좌번호</Label>
          {user?.account === null ? (
            <NoticeText>당첨금을 전달할 계좌가 필요해요</NoticeText>
          ) : (
            <Contents>{`${user?.account}`}</Contents>
          )}
        </ContentsBox>
        <NavigationButton
          onPress={() => {
            navigation.navigate("My" as never);
          }}>
          <ButtonLabel>{user?.account === null ? "등록" : "변경"}</ButtonLabel>
        </NavigationButton>
      </Square>
    </>
  );
};

export default Banks;

const NoticeText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 14px;
`;
const NavigationButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${wp(50)}px;
  height: ${wp(30)}px;
  background-color: #3e3e3e;
  border-radius: ${wp(5)}px;
`;
const ButtonLabel = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 15px;
`;

const Square = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${wp(10)}px ${wp(15)}px;
  border-radius: ${wp(10)}px;
`;
const IconBox = styled.View`
  justify-content: center;
  align-items: center;
  width: ${wp(40)}px;
  height: ${wp(40)}px;
`;
const ContentsBox = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px ${wp(8)}px;
`;
const Label = styled.Text`
  color: #929292;
  font-size: ${wp(12)}px;
  font-weight: 700;
`;
const Contents = styled.Text`
  color: #ffffff;
  font-size: ${wp(17)}px;
  font-weight: 900;
`;
