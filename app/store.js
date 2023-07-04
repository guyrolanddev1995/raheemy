import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import categorie from './features/categorieSlice'
import cartReducer from "./features/cartSlice"
import userReducer from "./features/userSlice"
import delivryAddressReducuer from "./features/delivryAddressSlice"
import checkoutReducer from "./features/checkoutSlice"
import AppDataReducer from "./features/appSlice"

export const store = configureStore({
    reducer: {
        categorie,
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        delivryAddress: delivryAddressReducuer,
        checkout: checkoutReducer,
        appData: AppDataReducer
    }
})