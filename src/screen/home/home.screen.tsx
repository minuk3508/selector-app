import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import RemainingTime from "./components/remainingTime";
import { CustomUser, userAtom } from "../../states/atoms/user.atom";
import { useRecoilState } from "recoil";
import { TotalTicket } from "../../states/stateHooks/useInitialTotalTickets";
import { totalTicketAtom } from "../../states/atoms/ticket.atom";
import TabView from "../../atomics/templates/TabView.template";
import Winnings from "./components/winnings";
import Banks from "./components/banks";
import { wp } from "../../utils/ui";
import Loading from "../../components/Loading";
import GetTicketButton from "./components/getTicketButton";

export type HomeProps = {
  userInfo: CustomUser;
  totalTickets: TotalTicket;
};

export default function Home(props: HomeProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setUser] = useRecoilState<CustomUser>(userAtom);
  const [totals, setTotals] = useRecoilState<TotalTicket>(totalTicketAtom);

  useEffect(() => {
    setUser(props.userInfo);
  }, [props.userInfo, setUser]);

  useEffect(() => {
    setTotals(props.totalTickets);
  }, [props.totalTickets]);

  const ticketData = [
    { id: "1", title: "전체 티켓 수", total: `${totals.total} 장` },
    {
      id: "2",
      title: "나의 티켓 수",
      total: `${totals.total_currentUser} 장`,
    },
    {
      id: "3",
      title: "당첨 확률",
      total:
        totals.total_currentUser === 0
          ? "0%"
          : `${((totals.total_currentUser / totals.total) * 100).toFixed(2)}%`,
    },
  ];

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <ItemWrapper key={`${item.id}`}>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemTotals>{item.total}</ItemTotals>
      </ItemWrapper>
    );
  };
  return (
    <>
      <TabView>
        <Wrapper>
          <RemainingTime />
          <Winnings />
          <Banks />
        </Wrapper>
        <FlatDashboard
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ListHeaderComponent={FlatPaddings}
          ListFooterComponent={FlatPaddings}
          ItemSeparatorComponent={FlatSeperator}
          renderItem={renderItem}
          data={ticketData}
        />
        <GetTicketButton setLoading={setLoading} />
      </TabView>
      <Loading open={loading} />
    </>
  );
}

const Wrapper = styled.View`
  justify-content: center;
  padding-top: ${wp(20)}px;
  padding-bottom: ${wp(20)}px;
  margin-top: ${wp(20)}px;
  margin-left: ${wp(20)}px;
  margin-right: ${wp(20)}px;
  margin-bottom: ${wp(30)}px;
  border-radius: ${wp(10)}px;
  background-color: #2d2c34;
`;
const ItemWrapper = styled.View`
  justify-content: space-between;
  align-items: flex-end;
  width: ${wp(130)}px;
  height: ${wp(80)}px;
  padding-top: ${wp(15)}px;
  padding-bottom: ${wp(15)}px;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  border-radius: ${wp(8)}px;
  background-color: #2d2c34;
`;
const ItemTitle = styled.Text`
  color: #929292;
  font-size: ${wp(15)}px;
  font-weight: 700;
`;
const ItemTotals = styled.Text`
  color: #ffffff;
  font-size: ${wp(20)}px;
  font-weight: 900;
`;
const FlatDashboard = styled.FlatList``;
const FlatPaddings = styled.View`
  width: ${wp(20)}px;
`;
const FlatSeperator = styled.View`
  width: ${wp(10)}px;
`;
