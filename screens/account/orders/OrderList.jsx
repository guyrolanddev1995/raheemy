import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useSelector} from "react-redux";
import useRouteIntendStore from "../../../hooks/UseRouteIntendStore";
import CustomStatusBar from "../../../components/CustomStatusBar";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import BaseText from "../../../components/BaseText";
import axiosInstance from "../../../services/axios";
import {showMessage} from "react-native-flash-message";
import useClearAuthUser from "../../../hooks/useClearAuthUser";
import Spinner from "../../../components/Spinner";
import OrderListItem from "./OrderListItem";
import {useIsFocused} from "@react-navigation/native";
import HeaderActions from "../../../components/HeaderActions";
import NotFound from "../../../components/Errors/NotFound";

const OrderListHeader = ({handleBack}) => {
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

                <View className="w-[75%] max-w-[75%] flex-1">
                    <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left">
                        Mes commandes
                    </BaseText>
                </View>
                <HeaderActions/>
            </View>
        </>
    )
}

const OrderList = ({navigation}) => {
    const {isAuthenticated} = useSelector(state => state.user)
    const {storeIntendedRoute} = useRouteIntendStore()
    const {clearAuthUserInfos} = useClearAuthUser()
    const isFocused = useIsFocused();

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrders = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get("/orders/customer");
            setOrders(response.data)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
                await clearAuthUserInfos()
                showMessage({
                    message: "Votre session a expirée; Veuillez vous conencter",
                    type: "error",
                });

                navigation.navigate("Login")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            storeIntendedRoute("UserOrderList")
            navigation.navigate("Login");
        }

        fetchOrders()
    }, [isFocused])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <View style={{flex: 1}}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <OrderListHeader
                        handleBack={() => navigation.goBack()}
                    />

                    {orders.length > 0 ? (
                        <ScrollView
                            className="pt-3 pb-6 px-2 flex-1"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 5}}
                        >
                            <View className="mb-5">
                                {orders.map(order => <OrderListItem key={order.code} order={order}/>)}
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-1 px-4 pt-20">
                            <NotFound
                                title="Aucune commande disponible"
                                message="Parcourez nos catégories et découvrez nos meilleurs offres"
                                icon={<MaterialCommunityIcons name="cart-remove" size={100} color="#e20615" />}
                                linkLabel="Commencer vos achats"
                                handleClick={() => navigation.navigate("Acceuil")}
                            />
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

export default OrderList;
