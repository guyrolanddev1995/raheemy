import React, {useEffect, useLayoutEffect} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import UserDelivryAdressItem from "./UserDelivryAdressItem";
import CustomStatusBar from "../../../components/CustomStatusBar";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {fetchDelivryAddress} from "../../../app/features/delivryAddressSlice";
import BaseText from "../../../components/BaseText";
import Spinner from "../../../components/Spinner";
import useRouteIntendStore from "../../../hooks/UseRouteIntendStore";
import CustomButton from "../../../components/CustomButton";
import {useIsFocused} from "@react-navigation/native";
import BottomBar from "../../../components/BottomBar";
import NotFound from "../../../components/Errors/NotFound";
import HeaderActions from "../../../components/HeaderActions";

const UserDelivryAddressListHeader = ({handleBack}) => {
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

                <View className="w-[75%] max-w-[75%] flex-1">
                    <BaseText numberOfLines={1} className="text-[17px] font-[700] text-white">
                        Carnet d'adresse
                    </BaseText>
                </View>

                <HeaderActions iconColors={"white"}/>
            </View>
        </>
    )
}

const UserDelivryAddressList = ({navigation}) => {
    const {isAuthenticated} = useSelector(state => state.user)
    const {address, loading} = useSelector(state => state.delivryAddress)
    const {storeIntendedRoute} = useRouteIntendStore()

    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    useEffect(() => {
        // redirige l'utilisateur à la page de connexion si ce dernier n'est pas authentifié
        if (!isAuthenticated) {
            storeIntendedRoute("UserDelivryAddressList")
            navigation.replace("Login");
        }

        /**
         * charge la liste des adresses de livraison depuis
         * le serveur si celui-ci n'est pas encore chargé
         */

        dispatch(fetchDelivryAddress({navigation}))

    }, [isFocused])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    return (
        <View className='flex-1'>
            {loading && (
                <View className="flex-1 justify-center items-center">
                    <Spinner/>
                </View>
            )}

            {!loading && (
                <>
                    <UserDelivryAddressListHeader
                        handleBack={() => navigation.goBack()}
                    />

                    {address?.length > 0 ? (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: 8}}
                            >
                                <View className="mt-2 px-3 space-y-2">
                                    {address.map(address => (
                                        <View className="space-y-1.5" key={address.id}>
                                            <UserDelivryAdressItem
                                                key={address.key}
                                                address={address}
                                            />
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
                        <View className="flex-1 pt-20">
                            <NotFound
                                title="Aucun adresse de livraison disponible"
                                message="Veuillez renseigner une adresse de livraison"
                                icon={<MaterialCommunityIcons name="book-cancel-outline" size={100} color="#e20615" />}
                                linkLabel="Ajouter une nouvelle adresse"
                                handleClick={() => navigation.navigate("CreateDelivryAddress")}
                            />
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

export default UserDelivryAddressList
