import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";


let initialState : IUser = 
    {
    activationLink: "",
    id: "",
    isActivated: undefined,
    login: "",
    name: "",
    password: "",
    role: "",
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers : {
        getUserInfo (state, action) {
            state = action.payload
            //(action.payload)
        }
    }
})

export const {getUserInfo} = UserSlice.actions
export default UserSlice.reducer
