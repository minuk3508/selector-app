import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import IconFont from "react-native-vector-icons/FontAwesome5";
import LeftIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { ToastMessage, wp } from "../../utils/ui";
import { Bank, bankData } from "../../data/banks";
import BankItem from "./components/bankItem";
import { editUser, getUser } from "../../api/user";

export default function Account(): JSX.Element {
  const [user, setUser] = useRecoilState<CustomUser>(userAtom);

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNum, setAccountNum] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  console.log(selectedBank);
  const renderItem = useCallback(
    ({ item, index }: { item: Bank; index: number }) => {
      return (
        <BankItem
          item={item}
          selectedBank={selectedBank}
          onPress={() => {
            if (selectedBank === null) {
              setSelectedBank(item);
            } else if (selectedBank.code !== item.code) {
              setSelectedBank(item);
            } else if (selectedBank.code === item.code) {
              setSelectedBank(null);
            }
          }}
        />
      );
    },
    [selectedBank],
  );
  return (
    <>
      <Container>
        <HeaderWrapper>
          <StatusBar barStyle={"light-content"} />
          <HeaderBox>
            <LeftButtonBox onPress={navigate.goBack}>
              <LeftIcon name="left" color={"#5f5f5f"} size={wp(23)} />
            </LeftButtonBox>
            <TitleBox>
              <TitleText>계좌등록</TitleText>
              <IconFont name="comment-dollar" color={"#44e954"} size={wp(23)} />
            </TitleBox>
            <RightButtonBox />
          </HeaderBox>
        </HeaderWrapper>
        <Wrapper>
          <SelectBankWrapper>
            <BankListLabel>은행을 선택하세요.</BankListLabel>
            <BankList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={ListPedding}
              ListFooterComponent={ListPedding}
              ItemSeparatorComponent={ListSeperator}
              renderItem={renderItem}
              data={bankData}
            />
          </SelectBankWrapper>
          {selectedBank === null ? null : (
            <>
              <AccountInfoWrapper>
                <AccountInfoLabel>계좌정보를 입력해주세요.</AccountInfoLabel>
                <InputBox>
                  <BankView>
                    {/* <selectedBank.logo /> */}
                    <BankName>{selectedBank.name}</BankName>
                  </BankView>

                  <Label>계좌번호</Label>
                  <Input
                    placeholder="'-' 없이 숫자만 입력해주세요."
                    onChangeText={setAccountNum}
                    value={accountNum}
                  />
                  <Label>예금주</Label>
                  <Input
                    placeholder="실명과 달라도 됩니다. 정확한 예금주를 써주세요."
                    onChangeText={setOwner}
                    value={owner}
                  />
                </InputBox>
              </AccountInfoWrapper>
              <ButtonWrapper>
                <Button
                  onPress={async () => {
                    const accountPattern = /^\d+$/;
                    if (user.uid) {
                      if (!accountPattern.test(accountNum)) {
                        if (accountNum.includes("-")) {
                          ToastMessage("'-'없이 번호만 입력해주세요.");
                        } else {
                          ToastMessage("계좌번호가 잘못된 것 같아요.");
                        }

                        return;
                      }

                      setLoading(true);
                      await editUser({
                        uid: user.uid,
                        name: user.name,
                        birth: user.birth,
                        email: user.email,
                        phone: user.phone,
                        account: [selectedBank.code, accountNum, owner],
                      }).then(async res => {
                        if (res === "success") {
                          const getUserInfo = await getUser({ uid: user.uid });
                          if (getUserInfo) {
                            setUser(getUserInfo);
                            console.log(getUserInfo);
                            navigate.goBack();
                            setLoading(false);
                          }
                        }
                      });
                    }
                  }}>
                  <ButtonText>완료</ButtonText>
                </Button>
              </ButtonWrapper>
            </>
          )}
        </Wrapper>
      </Container>
      <Loading open={loading} />
    </>
  );
}
const Wrapper = styled.ScrollView`
  flex: 1;
`;
const ButtonWrapper = styled.View`
  flex: 1;
  padding-left: ${wp(75)}px;
  padding-right: ${wp(75)}px;
  margin-top: ${wp(120)}px;
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
const BankView = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${wp(25)}px;
`;
const BankName = styled.Text`
  color: #ffffff;
  height: ${wp(25)}px;
  font-weight: 900;
  font-size: ${wp(18)}px;
  margin-left: ${wp(5)}px;
`;
const InputBox = styled.View`
  flex: 1;
  padding-left: ${wp(35)}px;
  padding-right: ${wp(35)}px;
`;
const Label = styled.Text`
  color: #929292;
  font-size: ${wp(13)}px;
  font-weight: 700;
  margin-bottom: ${wp(5)}px;
`;
const Input = styled.TextInput`
  color: #ffffff;
  font-size: ${wp(14)}px;
  font-weight: 700;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  padding-top: ${wp(5)}px;
  padding-bottom: ${wp(5)}px;
  margin-bottom: ${wp(15)}px;
  border-bottom-color: #ffffff;
  border-bottom-width: ${wp(1)}px;
`;
const AccountInfoWrapper = styled.View`
  flex: 1;
  padding-top: ${wp(25)}px;
`;
const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  padding-top: ${getStatusBarHeight()};
  background-color: #252525;
`;
const HeaderWrapper = styled.View`
  position: relative;
`;
const HeaderBox = styled.View`
  flex-direction: row;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(20)}px;
  justify-content: space-between;
`;
const TitleBox = styled.View`
  flex: 1;
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
const LeftButtonBox = styled.TouchableOpacity`
  width: 15%;
  padding-left: ${wp(10)}px;
  margin-right: ${wp(10)}px;
`;
const RightButtonBox = styled.TouchableOpacity`
  width: 15%;
`;
const SelectBankWrapper = styled.View`
  padding-top: ${wp(25)}px;
  padding-bottom: ${wp(25)}px;
`;
const BankListLabel = styled.Text`
  color: #929292;
  font-size: ${wp(20)}px;
  font-weight: 900;
  padding-left: ${wp(20)}px;
  padding-top: ${wp(25)}px;
  padding-bottom: ${wp(15)}px;
`;
const AccountInfoLabel = styled.Text`
  color: #929292;
  font-size: ${wp(20)}px;
  font-weight: 900;
  padding-left: ${wp(20)}px;
  padding-bottom: ${wp(25)}px;
`;
const BankList = styled.FlatList`
  max-height: ${wp(60)}px;
`;
const BankItemWrapper = styled.Pressable``;

const ListSeperator = styled.View`
  width: ${wp(10)}px;
`;
const ListPedding = styled.View`
  width: ${wp(20)}px;
`;
