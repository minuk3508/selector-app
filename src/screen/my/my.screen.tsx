import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import TabView from "../../atomics/templates/TabView.template";
import { ToastMessage, wp } from "../../utils/ui";
import LogOutButton from "./logOutButton";
import { TextInput } from "react-native";
import { editUser, getUser } from "../../api/user";
import Loading from "../../components/Loading";

export default function My(): JSX.Element {
  const [user, setUser] = useRecoilState<CustomUser>(userAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const [phoneNumEditMode, setPhoneNumberEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (phoneNumEditMode)
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
  }, [phoneNumEditMode]);
  useEffect(() => {
    if (emailEditMode)
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
  }, [emailEditMode]);
  console.log(emailEditMode);

  return (
    <>
      <TabView>
        <Title>
          <TitleText>내 정보</TitleText>
        </Title>
        <MainWrapper>
          <InputWrapper>
            <InputBox>
              <Label>전화번호</Label>

              <Input
                ref={phoneInputRef}
                editable={phoneNumEditMode}
                placeholder="당첨금 관련 안내 연락처"
                value={phoneNumEditMode ? phone : user?.phone ? user.phone : ""}
                onChangeText={setPhone}
              />
            </InputBox>
            <Button
              onPress={async () => {
                const pattern = /^01([016789])(?!-)\d{3,4}\d{4}$/;

                if (phoneNumEditMode && user.uid) {
                  if (!pattern.test(phone)) {
                    if (phone.includes("-")) {
                      ToastMessage("'-'없이 번호만 입력해주세요.");
                    } else {
                      ToastMessage("번호가 잘못된 것 같아요.");
                    }
                    setPhoneNumberEditMode(false);
                    setPhone("");
                    return;
                  }

                  setLoading(true);
                  await editUser({
                    uid: user.uid,
                    name: user.name,
                    birth: user.birth,
                    email: user.email,
                    phone: phone,
                    account: user.account,
                  }).then(async res => {
                    if (res === "success") {
                      const getUserInfo = await getUser({ uid: user.uid });
                      if (getUserInfo) {
                        setUser(getUserInfo);
                        console.log(getUserInfo);
                        setLoading(false);
                      }
                    }
                  });

                  setPhoneNumberEditMode(false);
                  ToastMessage("번호가 변경 되었어요");
                  setPhone("");
                } else {
                  console.log("변경 모드");
                  setPhoneNumberEditMode(true);
                }
              }}>
              <ButtonLabel>{phoneNumEditMode ? "완료" : "변경"}</ButtonLabel>
            </Button>
          </InputWrapper>
          {phoneNumEditMode ? (
            <NoticeBox>
              <NoticeMessage>인증은 따로 진행하지 않아요.</NoticeMessage>
              <NoticeMessage>따라서 번호만 정확히 입력해주셔야 돼요.</NoticeMessage>
              <NoticeMessage>
                당첨금 전달 관련 내용에 대한 안내문자를 드립니다.
              </NoticeMessage>
              <NoticeMessage>
                그 외의 광고 등 제 3의 목적을 위해 절대 사용하지 않아요.
              </NoticeMessage>
            </NoticeBox>
          ) : null}
          <InputWrapper>
            <InputBox>
              <Label>이메일</Label>
              <Input
                ref={emailInputRef}
                editable={emailEditMode}
                textContentType="emailAddress"
                placeholder="앱 소식에 대한 안내 이메일"
                value={emailEditMode ? email : user?.email ? user.email : ""}
                onChangeText={setEmail}
              />
            </InputBox>
            <Button
              onPress={async () => {
                const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailEditMode && user.uid) {
                  if (!pattern.test(email)) {
                    ToastMessage("이메일 형식이 아닌 것 같아요.");
                    setEmailEditMode(false);
                    setEmail("");
                    return;
                  }

                  setLoading(true);
                  await editUser({
                    uid: user.uid,
                    name: user.name,
                    birth: user.birth,
                    email: email,
                    phone: user.phone,
                    account: user.account,
                  }).then(async res => {
                    if (res === "success") {
                      const getUserInfo = await getUser({ uid: user.uid });
                      if (getUserInfo) {
                        setUser(getUserInfo);
                        console.log(getUserInfo);
                        setLoading(false);
                      }
                    }
                  });

                  setEmailEditMode(false);
                  ToastMessage("이메일이 변경 되었어요");
                  setEmail("");
                } else {
                  console.log("변경 모드");
                  setEmailEditMode(true);
                }
              }}>
              <ButtonLabel>{emailEditMode ? "완료" : "변경"}</ButtonLabel>
            </Button>
          </InputWrapper>
          {emailEditMode ? (
            <NoticeBox>
              <NoticeMessage>인증은 따로 진행하지 않아요.</NoticeMessage>
              <NoticeMessage>따라서 정확히 입력해주셔야 돼요.</NoticeMessage>
              <NoticeMessage>앱 소식에 대해서만 안내문자를 드립니다.</NoticeMessage>
              <NoticeMessage>
                그 외의 광고 등 제 3의 목적을 위해 절대 사용하지 않아요.
              </NoticeMessage>
            </NoticeBox>
          ) : null}
          <InputWrapper>
            <InputBox>
              <Label>계좌정보</Label>
              {user?.account === null ? (
                <NoticeText>당첨금을 전달할 계좌가 필요해요</NoticeText>
              ) : (
                <Contents>{`${user?.account[1]}`}</Contents>
              )}
            </InputBox>
            <Button
              onPress={() => {
                navigation.navigate("accounts" as never);
              }}>
              <ButtonLabel>변경</ButtonLabel>
            </Button>
          </InputWrapper>
        </MainWrapper>
        <LogOutButton />
      </TabView>
      <Loading open={loading} />
    </>
  );
}
const NoticeText = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: 14px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(5)}px;
`;
const Contents = styled.Text`
  color: #ffffff;
  font-size: ${wp(17)}px;
  font-weight: 900;
`;

const NoticeBox = styled.View`
  width: 100%;
  margin-bottom: ${wp(30)}px;
`;
const NoticeMessage = styled.Text`
  color: #929292;
  font-size: ${wp(14)}px;
  font-weight: 900;
  margin-bottom: ${wp(3)}px;
`;
const Title = styled.View`
  margin-top: ${wp(20)}px;
  margin-left: ${wp(20)}px;
  margin-right: ${wp(20)}px;
  margin-bottom: ${wp(20)}px;
`;
const TitleText = styled.Text`
  color: #929292;
  font-size: ${wp(25)}px;
  font-weight: 900;
`;
const MainWrapper = styled.ScrollView`
  flex: 1;
  padding: ${wp(20)}px;
`;
const InputBox = styled.View`
  flex: 1;
  margin-right: ${wp(30)}px;
`;
const InputWrapper = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-bottom: ${wp(20)}px;
`;
const Label = styled.Text`
  color: #929292;
  font-size: ${wp(13)}px;
  font-weight: 700;
  margin-bottom: ${wp(5)}px;
`;
const Input = styled.TextInput`
  color: #ffffff;
  font-size: ${wp(20)}px;
  font-weight: 700;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(5)}px;
  border-bottom-color: #ffffff;
  border-bottom-width: ${wp(1)}px;
`;
const Info = styled.Text`
  color: #565656;
  font-size: ${wp(13)}px;
  font-weight: 700;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(5)}px;
`;

const Button = styled.TouchableOpacity`
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
