import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";

const initialState = {
    categories: [],
    loading: false,
    categorieSelected: null,
    error: ''
}

const categorieSlice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {
        setSelectedCategorie: (state, action) => {
            state.categorieSelected = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.categorieSelected = action.payload[0]
            state.error = ""
        })

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error = action.error.message
        })
    }
})

export const {
    setSelectedCategorie
} = categorieSlice.actions

export const fetchCategories = createAsyncThunk('categorie/fetchCategories', async () => {
    const response = await axiosInstance.get('/categories/menu')
    return response.data
})

export default categorieSlice.reducer