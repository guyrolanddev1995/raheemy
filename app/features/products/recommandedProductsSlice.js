import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

const initialState = {
    products: [],
    loading: false,
    error: '',
}

const recommandedProductsSlice = createSlice({
    name: "recommandedProducts",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    }
})

export const fetchProducts = createAsyncThunk("recommandedProducts/fetchProducts", async () => {
    const response = await axiosInstance.get("/v2/products/featured")
    return response.data.data
})

export default recommandedProductsSlice.reducer