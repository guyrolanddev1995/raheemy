import {Pressable, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import CustomStatusBar from "../../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import BaseText from "../../components/BaseText";
import {useSelector} from "react-redux";
import UserInfo from "../../components/accountMenu/UserInfo";
import MenuSection from "../../components/accountMenu/MenuSection";
import Logout from "../../components/accountMenu/Logout";
import LoginBanner from "../../components/accountMenu/LoginBanner";

const AccountHeader = React.memo(({handleBack}) => {
    return (
        <>
            <CustomStatusBar backgroundColor="white"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
            >
                <View className="w-[75%] max-w-[75%]">
                    <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left">Mon Compte</BaseText>
                </View>
            </View>
        </>
    )
})
const AccountScreen = ({navigation}) => {
    const {isAuthenticated, user} = useSelector(state => state.user)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <View className="flex-1">
            <AccountHeader/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="py-3 px-3"
            >
                <View className="bg-white rounded flex-row items-center mb-3 px-3 py-3">
                    {isAuthenticated ? <UserInfo user={user}/> : <LoginBanner/>}
                </View>

                <MenuSection/>

                {isAuthenticated && <Logout/>}
            </ScrollView>
        </View>
    )
}

export default React.memo(AccountScreen)