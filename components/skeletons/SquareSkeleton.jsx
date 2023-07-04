import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const SquareSkeleton = ({ width = 80, height = 80, borderRadius = 3 }) => {
  const squareColor = useRef(new Animated.Value(0)).current;

  const squareStyle = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(squareColor, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(squareColor, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [squareColor]);

  const animatedStyle = {
    backgroundColor: squareColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#E0E0E0", "#C0C0C0"],
    }),
  };

  return <Animated.View style={[squareStyle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SquareSkeleton;
