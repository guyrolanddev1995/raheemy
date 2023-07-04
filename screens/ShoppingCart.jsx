import {Image, Pressable, ScrollView, StatusBar, View} from "react-native";
import CustomStatusBar from "../components/CustomStatusBar";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import BaseText from "../components/BaseText";
import React, {useCallback, useLayoutEffect, useState} from "react";
import useCart from "../hooks/useCart";
import {useDispatch, useSelector} from "react-redux";
import {currencyFormat} from "../Utils";
import BottomBar from "../components/BottomBar";
import CustomButton from "../components/CustomButton";
import {decrementQuantity, incrementQuantity, removeItem} from "../app/features/cartSlice";
import CustomModal from "../components/CustomModal";
import NotFound from "../components/Errors/NotFound";

const ShoppingCartHeader = ({totalQuantity, handleBack, canGoBack}) => {
    return (
        <>
            <CustomStatusBar backgroundColor="white"/>
            <View
                style={{marginTop: StatusBar.currentHeight}}
                className="bg-white flex-row w-full items-center px-4 space-x-4 py-3"
            >
                {canGoBack &&  <Pressable
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>
                </Pressable>}

                <View className="w-[75%] max-w-[75%]">
                    <BaseText numberOfLines={1} className="text-[17px] font-[700] text-left">
                        Panier
                        {totalQuantity > 0 ? `(${totalQuantity})` : ''}
                    </BaseText>
                </View>
            </View>
        </>
    )
}

const ShoppingCartItem = React.memo(({item})  => {
    const [quantity, setQuantity] = useState(item.quantity)
    const dispatch = useDispatch()
    const [showDialog, setShowDialog] = useState(false)

    const openDialog = useCallback(() =>  setShowDialog(true), [])
    const closeDialog = useCallback(() =>  setShowDialog(false), [])

    const onIncrement = () => {
        if(quantity >= item.attributes.product_quantity) {
            setQuantity(item.attributes.product_quantity)
        } else {
            setQuantity(quantity + 1)
            dispatch(incrementQuantity({id: item.id}))
        }
    }
    const decrement = () => {
        if(quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity((quantity) => quantity - 1)
            dispatch(decrementQuantity({id: item.id}))
        }
    }
    const onDeleteItem = useCallback(() => {
        dispatch(removeItem({id: item.id}))
        closeDialog()
    }, [])

    return (
        <>
            <View className="w-full mb-1 flex-row items-start justify-start bg-white px-1 py-2 rounded">
                <View className="w-[25%] h-[85px]">
                    <Image
                        source={{uri: item.attributes.image}}
                        className="w-full h-full rounded object-contain"
                    />
                </View>
                <View className="w-full flex-1 ml-2">
                    <BaseText numberOfLines={1} className="text-[13px] font-[700] text-left">{item.nom}</BaseText>
                    <BaseText numberOfLines={1} className="text-[17px] mt-1 font-[700] text-left text-primary">{currencyFormat(item.prix) + " FCFA"}</BaseText>

                    <View className="flex-row space-x-1">
                        {item.attributes.variation_options && Object.entries(item.attributes.variation_options).map(([attribute, attributeValues]) => (
                            <View key={attribute}>
                                <View numberOfLines={1} className=" bg-blue-500 rounded px-1.5  py-0.5 min-w-[20px]">
                                    <BaseText className="text-[11px] font-[700] text-white text-center">{attributeValues.value}</BaseText>
                                </View>
                            </View>
                        ))}

                    </View>

                    <View className="flex-row w-full justify-between items-center mt-3">
                        <View className="flex-row items-center space-x-3">
                            <Pressable
                                className="items-center justify-center bg-gray-100 w-7 h-7 rounded-full"
                                onPress={decrement}
                            >
                                <BaseText className="text-[12px]">-</BaseText>
                            </Pressable>

                            <BaseText className="text-[12px] font-[700]">{quantity}</BaseText>

                            <Pressable
                                className="items-center justify-center bg-gray-100 w-7 h-7 rounded-full"
                                onPress={onIncrement}
                            >
                                <BaseText className="text-[13px]">+</BaseText>
                            </Pressable>
                        </View>

                        <Pressable
                            onPress={openDialog}
                            className="w-7 h-7 items-center justify-center rounded-full border border-primary"
                        >
                            <Ionicons name="trash-outline" size={18} color="#e20615"/>
                        </Pressable>
                    </View>
                </View>
            </View>

            <CustomModal
              showModal={showDialog}
              handleClose={closeDialog}
              animation="fade"
            >
                <View className="px-1 py-2">
                    <BaseText className="text-[20px] font-semibold mt-2">Retirer du panier</BaseText>
                    <BaseText className="text-[16px] mt-8 font-medium">
                        Voulez-vous vraiment supprimer cet article du panier?
                    </BaseText>

                    <View className="flex-row w-full justify-end items-center space-x-3 mt-10">
                        <CustomButton
                            onPress={closeDialog}
                            className="bg-gray-200 px-5 py-2.5 rounded-full"
                        >
                            <BaseText className="text-[15px] font-medium">Annuler</BaseText>
                        </CustomButton>
                        <CustomButton
                            onPress={onDeleteItem}
                            className="bg-primary px-5 py-2.5 rounded-full"
                        >
                            <BaseText className="text-[15px] text-white font-medium">Retirer l'article</BaseText>
                        </CustomButton>
                    </View>
                </View>
            </CustomModal>
        </>
    )
})

const ShoppingCart = ({navigation, route}) => {
    const cart = useSelector(state => state.cart.cart)
    const [totalQuantity, totalPrice] = useCart()
    const isFocused = navigation.isFocused()

    const canGoBack = navigation.canGoBack()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation, isFocused]);

    return (
        <View style={{ flex: 1 }}>
            <ShoppingCartHeader
                totalQuantity={totalQuantity}
                handleBack={() => navigation.goBack()}
                canGoBack={canGoBack}
            />

            {cart.length > 0 ? (
                <>
                    <ScrollView className="pt-3 px-2 flex-1">
                        {cart.map(item => (
                            <ShoppingCartItem key={item.id} item={item}/>
                        ))}
                    </ScrollView>

                    <BottomBar>
                        <View
                            className="flex-row w-full justify-between items-center space-x-6"
                        >
                            <BaseText className="text-[17px] font-[700]">{currencyFormat(totalPrice) + " FCFA"}</BaseText>
                            <View className>
                                <CustomButton
                                    onPress={() => navigation.navigate("Checkout")}
                                    className="bg-red-600 px-4 py-2 flex flex-row space-x-3 items-center justify-center rounded-full"
                                >
                                    <BaseText className="text-white text-[16px] text-center">Payer Maintenant</BaseText>
                                </CustomButton>
                            </View>
                        </View>
                    </BottomBar>
                </>
            ) : (
                <View className="flex-1 px-4 pt-20">
                    <NotFound
                        title="Votre panier est vide"
                        message="Parcouez nos catagories et découvrez nos meilleurs offres"
                        icon={<MaterialCommunityIcons name="cart-remove" size={100} color="#e20615" />}
                        linkLabel="Commencer vos achats"
                        handleClick={() => navigation.navigate("Acceuil")}
                    />
                </View>
            )}
        </View>
    )
}

export default ShoppingCart