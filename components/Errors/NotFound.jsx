import {View} from "react-native";
import BaseText from "../BaseText";
import CustomButton from "../CustomButton";
import React from "react";
const NotFound = ({icon, title, message, showButton = true, linkLabel, handleClick}) => {

    return (
        <View className="px-4 items-center justify-center">
            {icon}

            <View className="mt-8">
                <BaseText className="text-[20px] font-[700] text-center">{title}</BaseText>
                <BaseText className="text-[16px] text-slate-700 text-center mt-2">{message}</BaseText>
            </View>

            {showButton && <View className="flex-row justify-center">
                <CustomButton
                    onPress={handleClick}
                    className="bg-primary p-3 mt-10 flex flex-row space-x-3 items-center rounded"
                >
                    <BaseText className="text-white text-center uppercase">{linkLabel}</BaseText>
                </CustomButton>
            </View>}
        </View>
    )
}

export default React.memo(NotFound)