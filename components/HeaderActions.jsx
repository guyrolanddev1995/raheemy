import React from 'react';
import {View, Pressable} from 'react-native';
import {Feather, Ionicons} from "@expo/vector-icons";
import BaseText from "./BaseText";
import {useNavigation} from "@react-navigation/native";
import useCart from "../hooks/useCart";

const HeaderActions = ({showSearch = true, showCart = true, iconColors="black"}) => {
    const navigation = useNavigation()
    const [totalQuantity] = useCart()

    return (
        <View className="ml-4 flex-row space-x-2">
            {showSearch && <Pressable
                onPress={() => navigation.navigate("Search")}
                className="mr-1 relative"
            >
                <Ionicons name="ios-search" size={24} color={iconColors}/>
            </Pressable>}

            {showCart && <Pressable
                onPress={() => navigation.navigate("Panier")}
                className="mr-1 relative"
            >
                <Feather name="shopping-cart" size={24} color={iconColors}/>
                {totalQuantity > 0 && <View className="absolute w-4 h-4 bg-red-500 rounded-full items-center justify-center -top-1 -right-3">
                    <BaseText className="text-white text-[9px]">{totalQuantity}</BaseText>
                </View>}
            </Pressable>}
        </View>
    );
}

export default React.memo(HeaderActions);
