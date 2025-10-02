import { createSlice } from "@reduxjs/toolkit";
import type { IUser, IAuthState } from "../../types";
import { UserApi } from "../../services/user";
import type { RootState } from "@reduxjs/toolkit/query";

export const authSlice = createSlice({
    name: 'auth',
    initialState : {user: null, token: ''} as IAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            UserApi.endpoints.login.matchFulfilled,
            (state, {payload}) => {
                state.token = payload.token,
                state.user = payload.user
            }
        )
    }
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user