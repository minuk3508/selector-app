import React from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import Zzz from "react-native-vector-icons/MaterialCommunityIcons";
import useRemainingTime from "../../../states/stateHooks/useRemainingTime";
import { Availability, getAds } from "../../../api/ticket";
import { useRecoilState } from "recoil";
import { CustomAd, adAtom } from "../../../states/atoms/ads.atom";
import { CustomUser, userAtom } from "../../../states/atoms/user.atom";
import { useNavigation } from "@react-navigation/native";

const GetTicketButton = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { hours } = useRemainingTime();
  const [user] = useRecoilState<CustomUser>(userAtom);
  const [_, setAd] = useRecoilState<CustomAd>(adAtom);
  const navigation = useNavigation();
  return (
    <Wrapper>
      {Number(hours) > 22 ? (
        <Button onPress={async () => {}}>
          <ButtonText>
            <Zzz name="sleep" size={35} color={"#69ff78"} />
          </ButtonText>
        </Button>
      ) : (
        <Button
          onPress={async () => {
            setLoading(true);
            const isAvailability = await Availability();

            if (isAvailability && user.uid) {
              await getAds({ userUid: user.uid })
                .then(res => {
                  setAd({ contents: res });
                  console.log(res);
                })
                .then(() => {
                  setLoading(false);
                  navigation.navigate("ads" as never);
                });
            }
          }}>
          <ButtonText>티켓 생성하기</ButtonText>
        </Button>
      )}
    </Wrapper>
  );
};

export default GetTicketButton;
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
