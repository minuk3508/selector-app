import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { CustomAd, adAtom } from "../../states/atoms/ads.atom";
import { useNavigation } from "@react-navigation/native";
import TabView from "../../atomics/templates/TabView.template";

export default function My(): JSX.Element {
  const [ad] = useRecoilState<CustomAd>(adAtom);
  const [user] = useRecoilState<CustomUser>(userAtom);
  const [showMessage, setShowMessage] = useState(false);
  const [time, setTime] = useState<number>(0);
  const navigate = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(true);
    }, 15000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    setTime(new Date().getTime());
  }, []);
  return (
    <TabView>
      <MainWrapper></MainWrapper>
    </TabView>
  );
}

const MainWrapper = styled.ScrollView`
  flex: 1;
  padding: 0px 20px;
`;
