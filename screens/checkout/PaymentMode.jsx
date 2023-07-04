import React, {useLayoutEffect} from 'react';
import {Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CustomStatusBar from "../../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import BaseText from "../../components/BaseText";
import CustomButton from "../../components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {setPaiementMode} from "../../app/features/checkoutSlice";
import {paiementModeData} from "../../data/PaiementMode";


const PaymentModeHeader = ({handleBack}) => {
    return (
        <>
            <CustomStatusBar backgroundColor="white"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
            >
                <Pressable
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>
                </Pressable>

                <View className="w-[75%] max-w-[75%]">
                    <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left"> Mode de
                        paiement</BaseText>
                </View>
            </View>
        </>
    )
}
const PaymentMode = ({navigation}) => {
    const {addressSelected, paiementMode } = useSelector(state => state.checkout)
    const dispatch = useDispatch()

    const enablePaymentMode = paiementModeData.filter(mode => addressSelected?.commune.moyen_payment.includes(mode.value))

    const handleSelected = (item) => {
        dispatch(setPaiementMode({
            mode_paiement: item,
            frais_livraison: addressSelected?.commune.frais_livraison
        }))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <>
            <PaymentModeHeader
                handleBack={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 8}}
            >
                <View className="mt-2 px-3 space-y-2">
                    {enablePaymentMode.map((item, index) => (
                        <View className="space-y-1.5" key={item.value}>
                            <Pressable
                                onPress={() => handleSelected(item)}
                                className={`
                                    w-full px-3 py-3 space-y-0.5 rounded-md bg-white
                                     ${item.value === paiementMode?.value ? 'bg-red-100' : ''}
                                `}
                            >
                                <View className="space-y-1.5">
                                    <View className="flex-row flex-wrap w-full space-x-3">
                                        {item.images.map((img, index) => (
                                            <View className="w-16 h-16 rounded"  key={index}>
                                                <Image
                                                    source={img}
                                                    className="w-full h-full object-contain rounded"
                                                />
                                            </View>
                                        ))}
                                    </View>
                                    <BaseText>{item.label}</BaseText>
                                </View>
                            </Pressable>
                        </View>
                    ))}

                    {paiementMode && <View
                        className="px-3 pt-5"
                    >
                        <CustomButton
                            onPress={() => navigation.goBack()}
                            className="bg-primary py-3 w-full rounded-full"
                        >
                            <BaseText className="text-[18px] font-[700] uppercase text-center text-white">Continuer</BaseText>
                        </CustomButton>
                    </View>}
                </View>
            </ScrollView>
        </>
    );
}

export default PaymentMode;
