import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { screenWidth } from "../utils/ui";
import { ActivityIndicator } from "react-native";

const Loading = (props: any) => {
  const { backgroundOpacity = 0.4 } = props;
  const { open = false } = props;

  return (
    <Modal
      style={{
        padding: 0,
        margin: 0,
        backgroundColor: "transparent",
      }}
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={backgroundOpacity}
      isVisible={open}
      useNativeDriver={true}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}>
      <Wrapper>
        <ActivityIndicator size="large" color="#69ff78" />
      </Wrapper>
    </Modal>
  );
};

export default Loading;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: ${screenWidth};
`;
