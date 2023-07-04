import {ScrollView, Text, View} from "react-native";
import CategorieItem from "./CategorieItem";
import BaseText from "./BaseText";

const FeaturedCategorieSection = ({categories}) => {
    return (
        <View className="mb-2 bg-white mt-2">
            <View className="py-2.5">
                <BaseText className="mx-4 mb-2 font-[700] text-[15px]">Top des catégories</BaseText>
            </View>
            <ScrollView
                className="px-4 pb-2.5"
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {categories.map(categorie => (
                    <CategorieItem
                        key={categorie.id}
                        image={categorie.image}
                        title={categorie.nom}
                        slug={categorie.slug}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedCategorieSection