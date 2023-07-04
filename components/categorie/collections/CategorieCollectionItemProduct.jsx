import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import ProductPourcentage from "../../ProductPourcentage";
import BaseText from "../../BaseText";
import Badge from "../../Badge";
import SalePrice from "../../product/SalePrice";
import Price from "../../product/Price";
import {useNavigation} from "@react-navigation/native";

const CategorieCollectionItemProduct = ({product}) => {

    const navigation = useNavigation()

    return (
        <Pressable
            key={product.id}
            style={{maxWidth: 400, width: 170}}
            onPress={() => navigation.navigate('product Details', {slug: product.slug})}
        >
            <View className="relative h-[160px] mr-2">
                <Image
                    source={{ uri: product.product_image}}
                    className="rounded"
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                />

                <View className="absolute right-2 top-2">
                    <ProductPourcentage reduction={product.pourcentage_reduction}/>
                </View>
            </View>

            <View className="mt-2">
                <BaseText numberOfLines={1} className="text-left font-[600]">{product.nom}</BaseText>

                {product.product_type == "simple" && <BaseText className="mt-1.5">
                    <Badge title={product.product_condition}/>
                </BaseText>}

                {product.product_type == "simple" ? (
                    <View className="mt-1">
                        {
                            product.prix_promo ?
                                <SalePrice
                                    price={product.prix}
                                    sale_price={product.prix_promo}
                                    priceStyles="text-red-600 font-[600] text-[16px] text-left"
                                    oldPriceStyle="text-gray-800 font-light text-[14px]"
                                />
                                : <Price price={product.prix} size="text-[16px]"/>
                        }
                    </View>
                ) : (
                    <>
                        {product.min_price === product.max_price ? (
                            <Price price={product.min_price}/>
                        ) : (
                            <View className="flex-row items-center flex-1 flex-wrap">
                                <Price price={product.min_price} size="text-[16px]"/>
                                <BaseText className="mx-2 text-[16px]">-</BaseText>
                                <Price price={product.max_price} size="text-[16px]"/>
                            </View>
                        ) }
                    </>
                )}

            </View>
        </Pressable>
    );
}

export default React.memo(CategorieCollectionItemProduct);
