import styled from "styled-components/native";
import { wp } from "../../../utils/ui";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import useRemainingTime from "../../../states/stateHooks/useRemainingTime";
import Zzz from "react-native-vector-icons/MaterialCommunityIcons";
import { GetWinner } from "../../../api/winning";
import { Platform } from "react-native";
const Alarm = () => {
  const { hours } = useRemainingTime();
  const [wins, setWins] = useState({ name: "사용자", totalTickets: 0, winnings: 0 });
  const init = async () => {
    const res = await GetWinner();
    setWins(res);
    console.log("??", res);
  };
  useEffect(() => {
    init();
  }, []);
  const NumberToLocaleString = (coin: string | number) => {
    let tempCoin = coin;
    if (isNaN(Number(tempCoin))) {
      return coin;
    } else {
      tempCoin = Number(coin);
    }

    return tempCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Wrapper2Title>
        <Wrapper2TitleText>오늘의 당첨자</Wrapper2TitleText>
      </Wrapper2Title>
      <Wrapper2>
        {Number(hours) > 22 ? (
          <Wrapper2Text>
            {`추첨중입니다. 밤 10시에 다시 시작해요.  `}
            <Zzz name="sleep" size={20} color={"#69ff78"} />
          </Wrapper2Text>
        ) : wins ? (
          <Swiper
            height={wp(20)}
            autoplay={true}
            loadMinimal={Platform.OS === "ios"}
            removeClippedSubviews={false}
            autoplayTimeout={5}
            showsPagination={false}>
            <Wrapper2Text>
              {wins.name}님
              <HighlightText>
                {NumberToLocaleString(wins.winnings + 10000)}원
              </HighlightText>
              당첨 축하드립니다.👏👏
            </Wrapper2Text>
            <Wrapper2Text>
              이번 추첨에서 {wins.name}님은{" "}
              <HighlightText>{wins.totalTickets}장</HighlightText>의 티켓을 뽑으셨네요👀
            </Wrapper2Text>
          </Swiper>
        ) : (
          <Wrapper2Text>{`당첨자를 확인중입니다.`}</Wrapper2Text>
        )}
      </Wrapper2>
    </>
  );
};

export default Alarm;

const Wrapper2 = styled.View`
  justify-content: center;
  padding-top: ${wp(10)}px;
  padding-bottom: ${wp(10)}px;
  padding-left: ${wp(20)}px;
  margin-top: ${wp(20)}px;
  margin-left: ${wp(20)}px;
  margin-right: ${wp(20)}px;
  border-radius: ${wp(10)}px;
  background-color: #2d2c34;
`;
const Wrapper2Text = styled.Text`
  width: 100%;
  color: #ffffff;
  font-size: ${wp(13)}px;
  font-weight: 900;
`;
const Wrapper2Title = styled.View`
  margin-top: ${wp(20)}px;
  margin-left: ${wp(20)}px;
  margin-right: ${wp(20)}px;
`;
const HighlightText = styled.Text`
  color: #69ff78;
  font-size: ${wp(13)}px;
  font-weight: 900;
`;
const Wrapper2TitleText = styled.Text`
  color: #d1d1d1;
  font-size: ${wp(17)}px;
  font-weight: 900;
`;
