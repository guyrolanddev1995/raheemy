import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BaseText from "../../BaseText";
import {useNavigation} from "@react-navigation/native";

const CategorieCollectionItemHeader = ({bgColor, title, slug, fontColor, fontWeight}) => {
    const navigation = useNavigation()

    return (
        <View
            style={{backgroundColor: bgColor, borderColor: bgColor}}
            className={`px-2 py-3 border-b flex-row`}
        >
            <BaseText style={{
                color: fontColor,
                fontSize: 16,
                fontWeight: fontWeight,
                flex: 1
            }}>
                {title}
            </BaseText>

            <Pressable
                onPress={() => navigation.navigate("Product Catalog", {
                    slug: slug,
                    title: title,
                    type: "CategorieCatalogue"
                })}
            >
                <BaseText style={{
                    color: fontColor,
                    fontSize: 14,
                    fontWeight: fontWeight,
                    flex: 1
                }}>Voir plus</BaseText>
            </Pressable>
        </View>
    );
}

export default React.memo(CategorieCollectionItemHeader);
