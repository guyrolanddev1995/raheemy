import BaseText from "./BaseText";
import {View} from "react-native";
import React from "react"

const Badge = ({title, size=""}) => {
    return(
        <View className="bg-blue-400 rounded px-1">
            <BaseText className="text-white">{title}</BaseText>
        </View>
    )
}

export default React.memo(Badge)