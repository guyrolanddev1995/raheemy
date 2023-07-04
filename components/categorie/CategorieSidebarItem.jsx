import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';
import BaseText from "../BaseText";

const CategorieSidebarItem = ({categorie, categorieSelectedId, onSelected}) => {
    const selectedBgColor = categorie.id === categorieSelectedId ? 'bg-white' : ''
    const textSelectedColor = categorie.id === categorieSelectedId ? 'text-red-600' : ''

    return (
        <Pressable
            key={categorie.id}
            className={`py-3 px-2.5 ${selectedBgColor}`}
            onPress={onSelected}
        >
            <BaseText className={`text-[13px] font-[400] ${textSelectedColor}`}>{categorie.nom}</BaseText>
        </Pressable>
    );
}

export default memo(CategorieSidebarItem);
