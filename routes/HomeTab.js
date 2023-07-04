import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/HomeScreen";
import CategorieScreen from "../screens/CategorieScreen";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/account/AccountScreen";
import {AntDesign, Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../commons/Colors";
import ShoppingCart from "../screens/ShoppingCart";

const HomeTab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    return (
        <HomeTab.Navigator
            initialRouteName={Home}
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarLabelStyle: {
                    fontWeight: "600",
                    fontSize: 12,
                },
                tabBarStyle:{
                    paddingVertical: 5,
                    elevation: 0,
                    borderTopWidth: 0.2,
                    borderColor: "#f1f5f9"
                },
                tabBarIcon: ({focused, color, size}) => {
                    let icon

                    switch (route.name) {
                        case "Acceuil":
                            icon = <Feather name="home" size={size} color={color} />;
                            break
                        case "Categories":
                            icon = <MaterialCommunityIcons name="view-grid-outline" size={size} color={color} />;
                            break
                        case "Panier":
                            icon = <Feather name="shopping-cart" size={size} color={color} />;
                            break
                        case "Compte":
                            icon = <AntDesign name="user" size={size} color={color} />;
                            break
                    }

                    return icon
                },
                tabBarActiveTintColor: PRIMARY_COLOR,
                tabBarInactiveTintColor: SECONDARY_COLOR,
            })}
        >
            <HomeTab.Screen name="Acceuil" component={HomeScreen}/>
            <HomeTab.Screen name="Categories" component={CategorieScreen}/>
            <HomeTab.Screen name="Panier" component={ShoppingCart}/>
            <HomeTab.Screen name="Compte" component={AccountScreen}/>
        </HomeTab.Navigator>
    )
}

export default HomeTabNavigator