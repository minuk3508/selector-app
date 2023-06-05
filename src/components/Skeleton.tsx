import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function SkeletonComponent({
  pendingWidth = "100%",
  pendingHeight = "100%",
}: {
  pendingWidth?: string | number;
  pendingHeight?: string | number;
}) {
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startPulseAnimation();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const pulseStyle = {
    opacity: pulseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  };

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: pendingWidth,
      height: pendingHeight,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
    skeleton: {
      width: "100%",
      height: "100%",
      backgroundColor: "#E8E8E8",
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, pulseStyle]} />
    </View>
  );
}
