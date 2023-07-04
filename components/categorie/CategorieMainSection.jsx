import React, {memo} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import BaseText from "../BaseText";
import defaultProductImage from "../../assets/default.png";
import {useNavigation} from "@react-navigation/native";

const CategorieMainSection = ({categorieChildren}) => {
    const navigation = useNavigation()
    const handleNavigation = (categorie) => {
       navigation.navigate("Product Catalog", {
           slug: categorie.slug,
           title: categorie.nom,
           type: "CategorieCatalogue"
       })
    }

    return (
        <ScrollView
            className="px-3 bg-white h-full flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 110
            }}
        >
            {categorieChildren?.length > 0 && categorieChildren.map(item => (
                <View key={item.id}
                      className="w-full border-b border-slate-50 pb-3"
                >
                    <View className="mt-2 mb-4 flex-row items-center">
                        <BaseText className="text-[13.5px] font-[700] flex-1">{item.nom}</BaseText>
                        <Pressable
                          onPress={() => handleNavigation(item)}
                        >
                            <BaseText className="text-primary text-[12.5px] font-[700]">Voir Tous</BaseText>
                        </Pressable>
                    </View>

                    {item.children.length > 0 && <View className="flex-row flex-wrap w-full gap-y-4 py-2">
                        {item.children.map(subItem => (
                            <Pressable
                                key={subItem.id}
                                className="w-1/3 items-center relative"
                                onPress={() => handleNavigation(subItem)}
                            >
                                {subItem.image ? (
                                    <Image
                                        source={{uri: subItem.image}}
                                        className="rounded"
                                        resizeMode="contain"
                                        style={{
                                            width: "90%",
                                            aspectRatio: 1
                                        }}
                                    />
                                ) : (
                                    <Image
                                        source={defaultProductImage}
                                        className="rounded"
                                        resizeMode="contain"
                                        style={{
                                            width: "90%",
                                            aspectRatio: 1
                                        }}
                                    />
                                )}
                                <BaseText className="text-[10px] text-center mt-1.5 font-[400]">{subItem.nom}</BaseText>
                            </Pressable>
                        ))}
                    </View>}
                </View>
            ))}
        </ScrollView>
    );
}
export default memo(CategorieMainSection);
