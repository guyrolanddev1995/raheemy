import {combineReducers} from "@reduxjs/toolkit";
import recommandedProducts from "./products/recommandedProductsSlice";
import productCatalogue from "./products/productsCatalogueSlice";


const productReducer = combineReducers({
    recommandedProducts,
    productCatalogue
})

export default productReducer