import {Image, Pressable, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import React, {memo, useCallback, useMemo, useRef} from "react";
import Price from "./Price";
import SalePrice from "./SalePrice";
import Badge from "../Badge";
import BaseText from "../BaseText";
import ProductPourcentage from "../ProductPourcentage";
import CustomButton from "../CustomButton";
import {addToCart} from "../../app/features/cartSlice";
import {useDispatch} from "react-redux";
import ProductDetailsVariations from "../../screens/productDetails/ProductDetailsVariations";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ProductDetailsVariableCard from "../../screens/productDetails/ProductDetailsVariableCard";

const ProductCard = ({
   title,
   image,
   slug,
   price,
   sale_price,
   id,
   product_type,
   pourcentage,
   product_condition,
   maxPrice,
   minPrice,
   quantite,
   uuid,
   variations
}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleAddToCart = useCallback(() => {
       if(product_type === "variable") {
           navigation.navigate('product Details', {slug: slug})
       } else {
           const productForCart = {
               quantity: 1,
               uuid: uuid,
               id: id,
               nom: title,
               prix: sale_price ? sale_price : price,
               attributes: {
                   slug: slug,
                   image: image,
                   product_quantity: quantite,
                   product_type: product_type,
                   variation_options: null
               }
           }

           dispatch(addToCart(productForCart))
       }

    }, [])

    return (
        <Pressable
            onPress={() => navigation.navigate('product Details', {slug: slug})}
            className="space-y-2 mb-3 bg-white rounded"
            style={{ width:"49%"}}
        >
            <View
                className="relative"
            >
                <Image
                    source={{ uri: image}}
                    className="rounded"
                    resizeMode="contain"
                    style={{
                        width: "100%",
                        aspectRatio: 1
                    }}
                />

                <View className="absolute right-2 top-2">
                    <ProductPourcentage reduction={pourcentage}/>
                </View>
            </View>
            <View className="px-2 flex-1">
                <BaseText numberOfLines={2} className="text-left font-[600]">{title}</BaseText>

                {product_type == "simple" && <BaseText className="mt-2">
                    <Badge title={product_condition}/>
                </BaseText>}

                {product_type == "simple" ? (
                    <View className="mt-1">
                        {
                            sale_price ?
                                <SalePrice
                                    price={price}
                                    sale_price={sale_price}
                                    reduction={pourcentage}
                                    priceStyles="text-red-600 font-[600] text-[17px] text-left"
                                    oldPriceStyle="text-gray-800 font-light text-[14px]"
                                />
                                : <Price price={price}/>
                        }
                    </View>
                ) : (
                    <View className="mt-1">
                        {minPrice === maxPrice ? (
                            <Price price={minPrice}/>
                        ) : (
                            <View className="flex-row items-center flex-1 flex-wrap">
                                <Price price={minPrice} className="text-"/>
                                <BaseText className="mx-2 text-[16px]">-</BaseText>
                                <Price price={maxPrice}/>
                            </View>
                        ) }
                    </View>
                )}

            </View>

            {product_type == "variable" && variations?.length > 0 && (
                <View className="border-slate-50 px-2">
                    <BaseText className="text-[13px] text-gray-700">
                        {`+ ${variations.length} autre(s) variante(s)`}
                    </BaseText>

                    <ProductDetailsVariableCard
                        variations={variations}
                        width="w-8"
                        height="h-8"
                    />
                </View>
            )}

            <View className="flex-1 items-center pb-3">
                <CustomButton
                    onPress={handleAddToCart}
                    className="bg-red-600 px-2 py-2.5 mt-0.5 flex flex-row space-x-3 items-center justify-center rounded w-[90%]"
                >
                    <BaseText className="text-white text-center">Ajouter au panier</BaseText>
                </CustomButton>
            </View>
        </Pressable>
    )
}
export default memo(ProductCard)