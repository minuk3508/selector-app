import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export default function Loading() {
  return (
    <LoadingBackground>
      <ActivityIndicator size="large" color="#69ff78" />
    </LoadingBackground>
  );
}
const LoadingBackground = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000092;
`;
