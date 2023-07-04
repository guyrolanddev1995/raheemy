import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";
import {fetchProducts} from "./products/recommandedProductsSlice";

const appSlice = createSlice({
    name: "app",
    initialState: {
        featuredProducts: [],
        featuredCategories: [],
        medias: [],
        collections: [],
        loading: false,
        errors: null
    },
    extraReducers: builder => {
        builder.addCase(fetchAppData.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchAppData.fulfilled, (state, action) => {
            state.loading = false
            state.featuredProducts = action.payload.featured_products
            state.featuredCategories = action.payload.featured_categories
            state.medias = action.payload.medias
            state.collections = action.payload.collections
            state.error = ''
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.featuredProducts = []
            state.featuredCategories = []
            state.medias = []
            state.collections = []
            state.error = action.error.message
        })
    }
})

export const fetchAppData = createAsyncThunk("app/fetchAppData", async () => {
    const response = await axiosInstance.get("/v2/app/resources")
    return response.data
})

export default appSlice.reducer;