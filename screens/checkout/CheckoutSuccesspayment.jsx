import React, {useLayoutEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import BaseText from "../../components/BaseText";
import CustomButton from "../../components/CustomButton";

const CheckoutSuccessPayment = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <SafeAreaView
            className="flex-1 justify-center items-center"
        >
            <View className="px-4">
                <View className="items-center mb-6">
                    <Image
                        source={require('../../assets/success.png')}
                        style={{width: 120, height: 120}}
                    />
                </View>

                <View className="items-center space-y-1">
                    <BaseText className="text-3xl text-center mb-3 text-green-600 font-semibold">Félicitations</BaseText>
                    <BaseText className="text-[16.5px] text-center">Votre command a été éffectée avec succès</BaseText>
                    <BaseText className="text-[16.5px] text-center">Vous recevrez un SMS de notification</BaseText>
                </View>

                <View className="mt-10 space-y-5">
                    <CustomButton
                        onPress={() => navigation.replace("UserOrderList")}
                        className="bg-primary py-2.5 w-full rounded"
                    >
                        <BaseText className="text-[16px] font-[700] uppercase text-center text-white">Voir ma commande</BaseText>
                    </CustomButton>

                    <CustomButton
                        onPress={() => navigation.replace("Home")}
                        className="bg-red-50 py-2.5 w-full rounded"
                    >
                        <BaseText className="text-[16px] font-[700] uppercase text-center text-primary">Retour à la boutique</BaseText>
                    </CustomButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutSuccessPayment
