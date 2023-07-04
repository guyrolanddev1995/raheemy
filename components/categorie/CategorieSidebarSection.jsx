import React, {memo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CategorieSidebarItem from "./CategorieSidebarItem";

const CategorieSidebarSection = ({categories, categorieSelectedId, handleCategorieSelected}) => {
    const [categorieSelected, setCategorieSelected] = useState(null)

    const onCategorieSelected = (categorie) => {
        setCategorieSelected(categorie)
        handleCategorieSelected(categorie)
    }

    return (
        <View className="w-[30%] fixed h-full">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 110
                }}
            >
                {categories.map(categorie =>
                    <CategorieSidebarItem
                        key={categorie.id}
                        categorie={categorie}
                        onSelected={() => onCategorieSelected(categorie)}
                        categorieSelectedId={categorieSelectedId}
                    />
                )}
            </ScrollView>
        </View>
    );
}

export default memo(CategorieSidebarSection);
