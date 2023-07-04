import {Platform, Pressable, View} from "react-native";
import BaseText from "../BaseText";
import React from "react";
import {MaterialIcons} from "@expo/vector-icons";

export const EmptyCard = ({title, handlePressed}) => {
	return (
		<Pressable
			onPress={handlePressed}
			className={`flex-row w-full px-3 py-4 space-y-0.5 rounded-md bg-white`}
		>
			<BaseText className={`flex-1 text-[15.5px] ${Platform.OS == "android" ? "font-bold": "font-semibold"}`}>{title}</BaseText>
			<MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
		</Pressable>
	)
}

export default React.memo(EmptyCard)