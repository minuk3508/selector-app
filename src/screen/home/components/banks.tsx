import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import { BankIcon, BankLogoIcon } from "../../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { CustomUser, userAtom } from "../../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { Bank, bankData } from "../../../data/banks";

const Banks = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState<CustomUser>(userAtom);

  // useEffect(() => {
  //   if (user.account !== null) {
  //     const Bank = bankData.filter(i => i.code === user.account[0]);
  //     setMyBank(Bank[2]);
  //   }
  // }, [user]);

  return (
    <>
      <Square>
        <IconBox>
          {user?.account === null ? (
            <BankIcon />
          ) : (
            <BankLogoIcon code={user?.account[0]} />
          )}
        </IconBox>
        <ContentsBox>
          <Label>계좌번호</Label>
          {user?.account === null ? (
            <NoticeText>당첨금을 전달할 계좌가 필요해요</NoticeText>
          ) : (
            <Contents>{`${user?.account[1]}`}</Contents>
          )}
        </ContentsBox>
        <NavigationButton
          onPress={() => {
            navigation.navigate("accounts" as never);
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
