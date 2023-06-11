import { Animated, StyleSheet } from "react-native";
import { Bank } from "../../../data/banks";
import React, { useRef } from "react";
import styled from "styled-components/native";
import { wp } from "../../../utils/ui";

const BankItem = ({
  item,
  selectedBank,
  onPress,
}: {
  onPress: any;
  item: Bank;
  selectedBank: Bank | null;
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const styles = StyleSheet.create({
    buttonStyle: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
  const buttonStyle = {
    transform: [{ scale: scaleValue }],
  };
  return (
    <BankItemWrapper
      onPressIn={handleButtonPress}
      onPress={onPress}
      isSelected={selectedBank?.code === item.code}>
      <Animated.View style={[styles.buttonStyle, buttonStyle]}>
        <item.logo />
        <BankName>{item.name}</BankName>
      </Animated.View>
    </BankItemWrapper>
  );
};

export default BankItem;
const BankItemWrapper = styled.Pressable<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  height: ${wp(50)}px;
  padding: ${wp(3)}px ${wp(8)}px;
  border-radius: ${wp(8)}px;
  background-color: ${({ isSelected }) => (isSelected ? "#3e3e3e" : "#252525")};
`;
const BankName = styled.Text`
  color: #ffffff;
  font-weight: 900;
  font-size: ${wp(18)}px;
  margin-left: ${wp(5)}px;
`;
