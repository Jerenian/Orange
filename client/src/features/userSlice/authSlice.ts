import { createSlice } from "@reduxjs/toolkit";
import type { IUser, IAuthState } from "../../types";
import { UserApi } from "../../services/user";
import type { RootState } from "@reduxjs/toolkit/query";

export const authSlice = createSlice({
    name: 'auth',
    initialState : {user: null, token: ''} as IAuthState,
    reducers: {

        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },

        logOut: (state, action?) => {
            state.user = null,
            state.token = ''
        }

    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         UserApi.endpoints.login.matchFulfilled,
    //         (state, {payload}) => {
    //             state.token = payload.token,
    //             state.user = payload.user
    //         }
    //     )
    // }
})

export default authSlice.reducer
export const {setCredentials, logOut} = authSlice.actions
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token