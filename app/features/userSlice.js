import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        isAuthenticated: false,
        token: null,
    },
    reducers:{
        setAuth(state, action) {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },

        removeAuth(state) {
            state.user = {}
            state.isAuthenticated = false
        }
    }
})

export const {
    setAuth,
    removeAuth
} = userSlice.actions

export default userSlice.reducer