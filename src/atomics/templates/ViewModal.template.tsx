import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { screenWidth, wp } from "../../utils/ui";

const ViewModal = (props: any) => {
  const { borderRaidus = 20, backgroundOpacity = 0.4 } = props;
  const { animationIn = "slideInUp", animationOut = "slideOutDown" } = props;
  const { open = false, onClose = () => {} } = props;

  return (
    <Modal
      style={{
        padding: 0,
        margin: 0,
        backgroundColor: "transparent",
      }}
      avoidKeyboard
      backdropOpacity={backgroundOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      isVisible={open}
      useNativeDriver={true}
      onBackdropPress={onClose}
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}>
      <Wrapper borderRaidus={borderRaidus}>{props.children}</Wrapper>
    </Modal>
  );
};

export default ViewModal;

const Wrapper = styled.View<{ borderRaidus: number }>`
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${screenWidth};
  border-top-left-radius: ${({ borderRaidus }) => `${wp(borderRaidus)}px`};
  border-top-right-radius: ${({ borderRaidus }) => `${wp(borderRaidus)}px`};
`;
