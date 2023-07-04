import React, {useLayoutEffect} from 'react';
import {Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CustomStatusBar from "../../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import BaseText from "../../components/BaseText";
import Spinner from "../../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import CustomButton from "../../components/CustomButton";
import {setAddress} from "../../app/features/checkoutSlice";
import BottomBar from "../../components/BottomBar";

const CheckoutDelivryAddressHeader = ({totalQuantity, handleBack}) => {
  return (
      <>
        <CustomStatusBar backgroundColor="black" style="dark"/>
        <View
            style={{marginTop: StatusBar.currentHeight}}
            className="bg-black flex-row w-full items-center px-4 space-x-4 py-3"
        >
          <Pressable
              onPress={handleBack}
          >
            <Ionicons name="arrow-back-outline" size={24} color="white"/>
          </Pressable>

          <View className="w-[75%] max-w-[75%]">
            <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left text-white">
              Adresse de livraison
            </BaseText>
          </View>
        </View>
      </>
  )
}
const CheckoutDelivryAddress = ({navigation}) => {
    const {address, loading} = useSelector(state => state.delivryAddress)
    const {addressSelected} = useSelector(state => state.checkout)
    const dispatch = useDispatch()

    const handleSelected = (selected) => {
        dispatch(setAddress(selected))
        navigation.goBack()
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [])

    return (
        <View className="flex-1">
            {loading && (
                <View className="flex-1 justify-center items-center">
                    <Spinner/>
                </View>
            )}

            {!loading && (
                <>
                    <CheckoutDelivryAddressHeader
                        handleBack={() => navigation.goBack()}
                    />

                    <View className="flex-1">
                        {address.length > 0 ? (
                            <>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{paddingBottom: 8}}
                                >
                                    <View className="mt-2 px-3 space-y-2">
                                        <View className="pt-3 pb-1">
                                            <BaseText className="">Sélectionner votre adresse de livraison</BaseText>
                                        </View>

                                        {address.map(address => (
                                            <View className="space-y-1.5" key={address.id}>
                                                <Pressable
                                                    onPress={() => handleSelected(address)}
                                                    className={`
                                                        w-full px-3 py-3 space-y-0.5 rounded-md bg-white
                                                        ${addressSelected.id === address.id? 'bg-red-100' : ''}
                                                    `}
                                                >
                                                    <View>
                                                        <BaseText className='text-[15px] mb-1'>{address.nom}</BaseText>
                                                        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.phone1} { address.phone2 ? `/ ${address.phone2}` : ''}</BaseText>
                                                        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.adresse}</BaseText>
                                                        <BaseText className='text-[13px] text-gray-900 font-[500]'>{address.ville.nom} {`, ${address.commune.nom}`}</BaseText>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>

                                <BottomBar>
                                    <View className="w-full space-x-6">
                                        <CustomButton
                                            onPress={() => navigation.navigate('CreateDelivryAddress')}
                                            className="bg-red-600 px-4 py-3 flex flex-row space-x-3 items-center justify-center rounded"
                                        >
                                            <BaseText className="text-white text-[16px] text-center uppercase">
                                                Nouvelle adresse
                                            </BaseText>
                                        </CustomButton>
                                    </View>
                                </BottomBar>
                            </>
                        ) : (
                            <View className="flex-1 items-center justify-center">
                                <View className="mt-8">
                                    <BaseText className="text-[18px] text-center">Aucun adresse de livraison disponible</BaseText>
                                    <BaseText className="text-[15px] text-slate-700 text-center mt-4">Veuillez renseigner une adresse de livraison</BaseText>
                                </View>

                                <View className="flex-row justify-center">
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('CreateDelivryAddress')}
                                        className="bg-primary p-3 mt-10 flex flex-row space-x-3 items-center rounded"
                                    >
                                        <BaseText className="text-white text-center">Nouvelle adresse</BaseText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}

export default CheckoutDelivryAddress;
