import {createSlice} from "@reduxjs/toolkit";
import {showMessage} from "react-native-flash-message";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);

            if(itemInCart) {
                if(itemInCart.quantity + action.payload.quantity > itemInCart.attributes.product_quantity) {
                    showMessage({
                        message: "Vous ne pouvez pas renseigner un quantité au-delà de quantité disponible",
                        type: "danger",

                    });
                    return
                }

                itemInCart.quantity += action.payload.quantity
                itemInCart.attributes["total_price"] = itemInCart.prix * itemInCart.quantity

                showMessage({
                    message: "Article ajouté au panier avec succus",
                    type: "success",

                });
            } else {
                action.payload.attributes["total_price"] = action.payload.prix * action.payload.quantity
                state.cart.push(action.payload);

                showMessage({
                    message: "Article ajouté au panier avec succus",
                    type: "success",

                });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            const newQuantity = item.quantity + 1

            if(newQuantity > item.attributes.product_quantity) {
                showMessage({
                    message: "Vous ne pouvez pas renseigner un quantité au-delà de quantité disponible",
                    type: "danger",
                });

                return
            }

            item.quantity = newQuantity
            item.attributes.total_price = item.prix * newQuantity

            showMessage({
                message: "Panier mise à jour avec succès",
                type: "success",
            });
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);

            if(item.quantity === 1) {
                item.quantity = 1
                item.attributes.total_price = item.prix * item.quantity

                showMessage({
                    message: "Panier mise à jour avec succès",
                    type: "success",
                });

                return
            } else {
                item.quantity -= 1
                item.attributes.total_price = item.prix * item.quantity

                showMessage({
                    message: "Panier mise à jour avec succès",
                    type: "success",
                });
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;

            showMessage({
                message: "le produit a été retiré du panier",
                type: "success",
            });
        },
        clearCart: (state, action) => {
            state.cart = []
        }
    }
})

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer