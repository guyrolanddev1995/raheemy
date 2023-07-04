import React from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import BaseText from "../BaseText";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const MenuSectionItem = ({menu}) => {
    const navigation = useNavigation()
  return (
      <Pressable
          key={menu.id}
          className="flex-row px-3 space-x-4 py-4 border-b border-slate-50"
          onPress={() => {
              navigation.navigate(menu.route)
          }}
      >
        <BaseText>{menu.icon}</BaseText>
        <View className="flex-1">
          <BaseText className={`
           text-[15px] ${Platform.OS == "ios" ? "font-semibold" : "font-bold"}
         `}>
            {menu.name}
          </BaseText>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </Pressable>
  );
}

export default MenuSectionItem;
