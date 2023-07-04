import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const LineSkeleton = ({ width = 300, height = 5, borRadius = 5 }) => {
  const lineColor = useRef(new Animated.Value(0)).current;

  const lineStyle = {
    width: width,
    height: height,
    marginVertical: 5,
    borderRadius: borRadius,
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineColor, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(lineColor, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [lineColor]);

  const animatedStyle = {
    backgroundColor: lineColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#E0E0E0", "#C0C0C0"],
    }),
  };

  return <Animated.View style={[lineStyle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LineSkeleton;
