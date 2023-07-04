import React from 'react';
import {Image, Platform, Pressable, ScrollView, Text, View} from 'react-native';
import ProductPourcentage from "../../ProductPourcentage";
import BaseText from "../../BaseText";
import Badge from "../../Badge";
import SalePrice from "../../product/SalePrice";
import Price from "../../product/Price";
import CategorieCollectionItemHeader from "./CategorieCollectionItemHeader";
import CategorieCollectionItemProduct from "./CategorieCollectionItemProduct";

const CategorieCollectionItem = ({collection}) => {

    const fontColor = collection.collection_font_color != "null" ? collection.collection_font_color : "black"
    const bgColor = collection.collection_bg_color != "null" ? collection.collection_bg_color : "white"
    const title = collection.collection_title ? collection.collection_title : collection.nom

    const fontWeight = Platform.OS === "android" ? 800 : 600

    return <View className="w-full mb-3">
        <CategorieCollectionItemHeader
            fontColor={fontColor}
            bgColor={bgColor}
            title={title}
            fontWeight={fontWeight}
            slug={collection.slug}
        />

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pt-2 pb-2 px-2 bg-white"
        >
            {collection.products.map(product => (
                <CategorieCollectionItemProduct
                    product={product}
                    key={product.id}
                />
            ))}
        </ScrollView>
    </View>
}

export default React.memo(CategorieCollectionItem);
