import {createSlice} from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        paiementMode: null,
        addressSelected: null,
        amount: '',
        frais_livraison: 0
    },
    reducers: {
        setPaiementMode: (state, action) => {
            state.paiementMode = action.payload.mode_paiement
            state.frais_livraison = action.payload.frais_livraison
        },
        setAddress: (state, action) => {
            state.addressSelected = action.payload;
        },
        clearCheckout: (state, action) => {
            state.addressSelected = null;
            state.amount = '';
            state.frais_livraison = 0
            state.paiementMode = null
        }
    }
})

export const {
    setPaiementMode,
    setAddress,
    clearCheckout
} = checkoutSlice.actions

export default checkoutSlice.reducer