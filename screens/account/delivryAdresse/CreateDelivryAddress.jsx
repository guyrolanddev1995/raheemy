import React, {useEffect, useLayoutEffect} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useSelector} from "react-redux";
import useRouteIntendStore from "../../../hooks/UseRouteIntendStore";
import CustomStatusBar from "../../../components/CustomStatusBar";
import {Ionicons} from "@expo/vector-icons";
import BaseText from "../../../components/BaseText";
import useClearAuthUser from "../../../hooks/useClearAuthUser";
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import axiosInstance from "../../../services/axios";
import DelivryAddressForm from "./DelivryAddressForm";

const CreateDelivryAddressHeader = ({handleBack}) => {
  return (
      <>
        <CustomStatusBar backgroundColor="black" style={"light"}/>
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
            <BaseText numberOfLines={1} className="text-[17px] font-[700] text-white">
              Nouvelle adresse de livraison
            </BaseText>
          </View>
        </View>
      </>
  )
}

const CreateDelivryAddress = ({navigation}) => {
  const {isAuthenticated, user} = useSelector(state => state.user)
  const {storeIntendedRoute} = useRouteIntendStore()
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isAuthenticated) {
      storeIntendedRoute("CreateDelivryAddress")
      navigation.navigate("Login");
    }
  }, [isFocused])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
      <View style={{flex: 1}}>
        <CreateDelivryAddressHeader
            handleBack={() => navigation.goBack()}
        />
         <DelivryAddressForm user={user} navigation={navigation} route={"CreateDelivryAddress"}/>
      </View>
  );
}

export default CreateDelivryAddress;
