import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

const initialState = {
    products: [],
    loading: false,
    moreLoading: false,
    error: '',
    pagination: {
        currentPage: 1,
        lastPage: 1,
        totalPage: 1,
    },
}

const productCatalogueSlice = createSlice({
    name: "productCatalogue",
    initialState,
    reducers: {
      resetProductCatalogue: (state) => {
        state.products = []
        state.loading = false
        state.moreLoading = false
        state.error = ''
        state.pagination = {
          currentPage: 1,
          lastPage: 1,
          totalPage: 1,
        }
      }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductCatalogue.pending, (state, action) => {
            state.loading = true
            state.moreLoading = false
        })

        builder.addCase(fetchProductCatalogue.fulfilled, (state, action) => {
            state.loading = false
            state.moreLoading = false
            state.products = action.payload.data
            state.pagination = {
                currentPage: action.payload.current_page,
                lastPage: action.payload.last_page,
                totalPage: action.payload.total,
            }
            state.error = ''
        })

        builder.addCase(fetchProductCatalogue.rejected, (state, action) => {
            state.loading = false
            state.moreLoading = false
            state.products = []
            state.error = action?.error.message
        })

        builder.addCase(loadMoreProductCatalogue.pending, (state, action) => {
            state.moreLoading = true
            state.loading = false
        })

        builder.addCase(loadMoreProductCatalogue.fulfilled, (state, action) => {
            state.moreLoading = false
            state.loading = false
            state.products = state.products.length > 0
                ? [...state.products, ...action.payload.data]
                : action.payload.products.data
            state.pagination = {
                currentPage: action.payload.current_page,
                lastPage: action.payload.last_page,
                totalPage: action.payload.total,
            }
        })

        builder.addCase(loadMoreProductCatalogue.rejected, (state, action) => {
            state.moreLoading = false
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    }
})

export const { resetProductCatalogue } = productCatalogueSlice.actions

export const fetchProductCatalogue = createAsyncThunk(
    "productCatalogue/fetchProductCatalogue",
    async ({ slug, type="CategorieCatalogue" }, {getState}) => {
        const state = getState()
        let url

        switch (type) {
            case "SearchCatalogue":
                url = `/v2/products/search/query?q=${slug}&page=${state.product.productCatalogue.pagination.currentPage}`
                break
            default:
                url = `/v2/categories/${slug}/products?page=${state.product.productCatalogue.pagination.currentPage}&content_type=json`
        }

        const response = await axiosInstance.get(url)

        if(type === "SearchCatalogue") {
            return response.data
        }

        return response.data
    }
);

export const loadMoreProductCatalogue = createAsyncThunk(
    "productCatalogue/loadMoreProductCatalogue",
    async ({ slug, page, type="CategorieCatalogue" }, {getState}) => {
        let url

        switch (type) {
            case "SearchCatalogue":
                url = `/v2/products/search/query?q=${slug}&page=${page}`
                break
            default:
                url = `/v2/categories/${slug}/products?page=${page}&content_type=json`
        }

        const response = await axiosInstance.get(url)

        if(type === "SearchCatalogue") {
            return response.data
        }

        return response.data
    }
);

export default productCatalogueSlice.reducer