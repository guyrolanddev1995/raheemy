import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {removeAuth} from "./userSlice";
import {showMessage} from "react-native-flash-message";
import {setAddress} from "./checkoutSlice";


const delivryAddressSlice = createSlice({
    name: "delivryAddress",
    initialState: {
        loading: false,
        address: [],
        errors: null
    },
    extraReducers: builder => {
        builder.addCase(fetchDelivryAddress.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(fetchDelivryAddress.fulfilled, (state, action) => {
            state.loading = false
            state.address = action.payload
            state.errors = null

        })

        builder.addCase(fetchDelivryAddress.rejected, (state, action) => {
            state.loading = false
            state.address = []
            state.errors = action?.error.message
        })
    }
})

export const fetchDelivryAddress = createAsyncThunk(
    "delivryAddress/fetchDelivryAddress",
    async ({navigation}, {rejectWithValue, dispatch}) => {

        try {
            const response = await axiosInstance.get("/delivry-adresses/all")

            if(response.data.length > 0) dispatch(setAddress(response.data[0]))

            return response.data
        } catch (error) {
            if(error.response && error.response.status === 401) {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("user");
                dispatch(removeAuth())

                showMessage({
                    message: "Votre session a expirée; Veuillez vous conencter",
                    type: "error",
                });

                navigation.navigate("Login")
            }
        }
    }
)

export default delivryAddressSlice.reducer