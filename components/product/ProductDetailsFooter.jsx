import React, {useState} from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import {Feather} from "@expo/vector-icons";
import BaseText from "../BaseText";
import CustomButton from "../CustomButton";

const ProductDetailsFooter = ({product, openBottomSheet, handleAddToCart, handleRedirectHome}) => {
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    if(quantity >= product.quantite) {
        setQuantity(product.quantite)
    } else {
        setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if(quantity <= 1) {
        setQuantity(1)
    } else {
        setQuantity((quantity) => quantity - 1)
    }
  }

  const addToCart = () => {
      handleAddToCart({
          quantity,
          data: null,
          type: "simple"
      })

      setQuantity(1)
  }

  return (
        <View
            className={`
               flex-row items-center justify-between  px-3 w-full bg-white pt-3 border-t border-slate-50 shadow-xs space-x-8
               ${Platform.OS === 'ios' ? 'pb-7' : 'pb-3'}
            `}
        >
          <View className="">
            <Pressable
                className="justify-center items-center"
                onPress={handleRedirectHome}
            >
              <Feather name="home" size={22} color="black"/>
              <BaseText className="text-[13px]">Accueil</BaseText>
            </Pressable>
          </View>

          <View
              className={`
                ${product?.product_type === "variable" ? "w-auto" : "w-full"}
                flex-row items-center space-x-6
              `}
          >
            {product.product_type === "simple" && (
                <View className="flex-row items-center space-x-4 h-full">
                  <Pressable
                      className="items-center justify-center bg-gray-100 w-8 h-8 rounded-full"
                      onPress={decrement}
                  >
                    <BaseText className="text-[17px]">-</BaseText>
                  </Pressable>

                  <BaseText className="text-[17px]">{quantity}</BaseText>

                  <Pressable
                      className="items-center justify-center bg-gray-100 w-8 h-8 rounded-full"
                      onPress={increment}
                  >
                    <BaseText className="text-[16px]">+</BaseText>
                  </Pressable>
                </View>
            )}

            <View className>
              {product?.product_type === "variable" ? (
                  <CustomButton
                      onPress={openBottomSheet}
                      className="bg-red-600 px-3 py-2.5 flex flex-row space-x-3 items-center justify-center rounded-full"
                  >
                    <BaseText className="text-white text-[16px] text-center">Sélectionner une variante</BaseText>
                  </CustomButton>
              ) : (
                  <CustomButton
                      onPress={addToCart}
                      className="bg-red-600 px-2 py-2.5 flex flex-row space-x-3 items-center justify-center rounded-full"
                  >
                    <BaseText className="text-white text-[16px] text-center">Ajouter au panier</BaseText>
                  </CustomButton>
              )}
            </View>
          </View>
        </View>
    );
}

export default React.memo(ProductDetailsFooter);
