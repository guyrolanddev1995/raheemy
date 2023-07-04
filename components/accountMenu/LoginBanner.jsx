import React from 'react';
import {Platform, Text, View} from 'react-native';
import BaseText from "../BaseText";
import CustomButton from "../CustomButton";
import {useNavigation} from "@react-navigation/native";

const LoginBanner = () => {
    const navigation = useNavigation()
    return (
        <View className="w-full flex-row justify-between items-center">
            <View>
                <BaseText className={`text-[19px] ${Platform.OS === "android" ? "font-bold" : "font-semibold"}`}>Bienvenue</BaseText>
                <BaseText className="text-[13px] font-semibold mt-0.5">Veuillez-vous connecter</BaseText>
            </View>

            <CustomButton
                onPress={() => navigation.navigate("Login")}
                className="bg-red-50 px-2 py-2 rounded"
            >
                <BaseText className="text-[14px] font-[600] text-primary uppercase text-left">Se connecter</BaseText>
            </CustomButton>
        </View>
    );
}

export default React.memo(LoginBanner);
