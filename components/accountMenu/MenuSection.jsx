import React from 'react';
import {View} from 'react-native';
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import MenuSectionItem from "./MenuSectionItem";

const menus = [
  {
    id: 1,
    name: "Mes commandes",
    icon: <Feather name="shopping-cart" size={20} color="black"/>,
    route: "UserOrderList",
  },
  // {
  //   id: 2,
  //   name: "Mes transactions",
  //   icon: "eva-at-outline",
  //   route: "UserAdresseList",
  // },
  {
    id: 3,
    name: "Ma liste de favoris",
    icon: <AntDesign name="hearto" size={20} color="black" />,
    route: "AccountFavoriteProducts",
  },
  // {
  //   id: 4,
  //   name: "Vue récemment",
  //   icon: "eva-eye-outline",
  //   route: "UserAdresseList",
  // },
  {
    id: 5,
    name: "Mon carnet d'adresse",
    icon: <Ionicons name="bookmark-outline" size={20} color="black"/>,
    route: "UserDelivryAddressList",
  },

  {
    id: 6,
    name: "Paramètre du compte",
    icon: <Ionicons name="settings-outline" size={20} color="black" />,
    route: "AccountProfil",
  },
];

const MenuSection = () => {
  return (
      <View className="bg-white rounded">
        {menus.map(menu  => <MenuSectionItem key={menu.id} menu={menu}/>)}
      </View>
  );
}

export default React.memo(MenuSection);
