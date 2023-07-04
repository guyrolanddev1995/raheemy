import {useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet} from "react-native";

const CircleSkeleton = ({width = 100, height = 100, borderRadius = 100}) => {
	const circleColor = useRef(new Animated.Value(0)).current;

	const circleStyle = {
		width: width,
		height: height,
		borderRadius: borderRadius
	};

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(circleColor, {
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
				Animated.timing(circleColor, {
					toValue: 0,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			]),
		).start();
	}, [circleColor]);

	const animatedStyle = {
		backgroundColor: circleColor.interpolate({
			inputRange: [0, 1],
			outputRange: ['#E0E0E0', '#C0C0C0'],
		}),
	};

	return <Animated.View style={[circleStyle, animatedStyle]} />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default CircleSkeleton;