import {ScrollView, Text, View} from "react-native";
import {primary} from "../commons/Colors";
import ProductFeaturedCard from "./ProductFeaturedCard";
import {useEffect, useState, memo} from "react";
import BaseText from "./BaseText";
import {apiService} from "../services/axios";

const productHorizontalListSection =({collection}) => {
    const {
        collection_bg_color,
        collection_font_color,
        collection_title,
        nom,
        slug,
        id,
    } = collection

    const [products, setProducts] = useState([])

    const getColor = collection_bg_color ?? primary;
    const title = collection_title ?? nom
    const fontColor = collection_font_color !== "null" ? collection_font_color : '#000'

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                const response = await apiService.get(`/v2/categories/${slug}/products?page=1&content_type=json&limit=10`)
                setProducts(response.data.data)
            } catch (error) {

            }
        }

        fetchCollectionProducts()

    }, [slug])

    return (
        <View
            className="w-full mb-2"
        >
            <View
                style={{
                    justifyContent: "space-between",
                    backgroundColor: getColor
                }}
                className="flex-row px-4 py-3"
            >
                <BaseText className="text-white" style={{color: fontColor}}>{title}</BaseText>
                <BaseText className="text-white" style={{color: fontColor}}>Voir plus</BaseText>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="bg-white py-2"
                numColumns={2}
                contentContainerStyle={{ paddingRight: 10 }}
            >
                {products.map(product => (
                    <View className="mx-2" key={product.id}>
                        <ProductFeaturedCard
                            product={product}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default memo(productHorizontalListSection)