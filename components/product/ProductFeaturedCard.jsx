import {Image, Pressable, Text, View} from "react-native";
import {memo} from "react";
import BaseText from "./BaseText";
import {currencyFormat} from "../Utils";
import Badge from "./Badge";
import SalePrice from "./SalePrice";
import Price from "./Price";
import {useNavigation} from "@react-navigation/native";

const ProductFeaturedCard = ({product}) => {
    const {
        nom,
        prix,
        prix_promo,
        slug,
        uuid,
        id,
        product_image: image,
        product_type,
        pourcentage_reduction
    } = product

    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.navigate('product Details', {slug: slug})}
            className="space-y-2"
        >
            <View
                className="relative justify-center items-center"
            >
                <Image
                    source={{ uri: image}}
                    className="rounded"
                    resizeMode="contain"
                    style={{
                        width: 160,
                        height: 158
                    }}
                />
            </View>
            <View>
                <BaseText numberOfLines={1} className="text-xs text-left">{nom}</BaseText>

                <BaseText className="my-1">
                    <Badge title={product_type}/>
                </BaseText>

                <View className="mt-1">
                    {
                        prix_promo ?
                            <SalePrice
                                price={prix}
                                sale_price={prix_promo}
                                reduction={pourcentage_reduction}
                                priceStyles="text-primary text-[17px] text-left"
                                oldPriceStyle="text-gray-800 font-light text-[14px]"
                            />
                            : <Price price={prix}/>
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default memo(ProductFeaturedCard)