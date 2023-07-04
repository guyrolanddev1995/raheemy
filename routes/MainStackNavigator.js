import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from "../screens/productDetails/ProductDetailsScreen";
import ShoppingCart from "../screens/ShoppingCart";
import ProductCatalogScreen from "../screens/ProductCatalogScreen";
import SearchScreen from "../screens/SearchScreen";
import PaymentMode from "../screens/checkout/PaymentMode";
import LoginScreen from "../screens/auth/LoginScreen";
import HomeTabNavigator from "./HomeTab";
import {Platform} from "react-native";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import checkoutDelivryAddress from "../screens/checkout/CheckoutDelivryAddress";
import WebViewScreen from '../screens/WebViewScreen';
import CheckoutSuccessPayment from "../screens/checkout/CheckoutSuccesspayment";
import OrderList from "../screens/account/orders/OrderList";
import OrderDetails from "../screens/account/orders/OrderDetails";
import UserDelivryAddressList from "../screens/account/delivryAdresse/UserDelivryAddressList";
import CreateDelivryAddress from "../screens/account/delivryAdresse/CreateDelivryAddress";
import RegisterScreen from "../screens/auth/RegisterScreen";
import VerifyAccountScreen from "../screens/auth/VerifyAccountScreen";

const MainStack = createNativeStackNavigator()

const MainStackNavigator = ({isAuthenticated}) => {
    return (
        <MainStack.Navigator
            initialRouteName="Home"
        >
            <MainStack.Screen
                name="Home" component={HomeTabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <MainStack.Screen
                name="product Details"
                component={ProductDetailsScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
            <MainStack.Screen
                name="Panier"
                component={ShoppingCart}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
            <MainStack.Screen
                name="Product Catalog"
                component={ProductCatalogScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
            <MainStack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_bottom'
                }}
            />

            <MainStack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
            <MainStack.Screen
                name="CheckoutDelivryAddress"
                component={checkoutDelivryAddress}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
            {/*<MainStack.Screen*/}
            {/*    name="DelivryAdressForm"*/}
            {/*    component={DelivryAddressForm}*/}
            {/*    options={{*/}
            {/*        presentation: "fullScreenModal",*/}
            {/*        animation: 'fade_from_bottom',*/}
            {/*        animationDuration: "300ms",*/}
            {/*        animationTypeForReplace: "push"*/}
            {/*    }}*/}
            {/*/>*/}

            <MainStack.Screen
                name="ModePaiment"
                component={PaymentMode}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="SuccessPayment"
                component={CheckoutSuccessPayment}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="UserOrderList"
                component={OrderList}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="UserOrderDetails"
                component={OrderDetails}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="UserDelivryAddressList"
                component={UserDelivryAddressList}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="CreateDelivryAddress"
                component={CreateDelivryAddress}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    animation: "fade_from_bottom"
                }}
            />

            <MainStack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="VerifyAccount"
                component={VerifyAccountScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />

            <MainStack.Screen
                name="WebView"
                component={WebViewScreen}
                options={{
                    animation: Platform.OS == "android" ? 'fade_from_bottom' : 'slide_from_right'
                }}
            />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator