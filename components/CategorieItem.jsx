import {Image, Pressable, View} from "react-native";
import BaseText from "./BaseText";
import defaultProductImage from "../assets/default.png";
import {useNavigation} from "@react-navigation/native";

const CategorieItem = ({title, image, slug}) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.navigate("Product Catalog", {
                slug: slug,
                title: title,
                type: "CategorieCatalogue"
            })}
            className="w-24 mr-3 last:mr-3">
            <View className="w-full h-20 justify-center items-center rounded">
                {image ? (
                    <Image
                        source={{uri: image}}
                        style={{aspectRatio: 1}}
                        className="w-full h-full rounded"
                    />
                ) : (
                    <Image
                        source={defaultProductImage}
                        style={{width: "100%", height: "100%"}}
                        className="w-full h-full rounded cover"
                    />
                )}
            </View>
            <BaseText className="text-center mt-2 text-[13px] w-full">{title}</BaseText>
        </Pressable>
    )
}

export default CategorieItem