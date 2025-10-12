import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";


let initialState = 
{
    data: {
        activationLink: "",
        id: "",
        isActivated: undefined,
        login: "",
        name: "",
        password: "",
        role: "",
    }
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers : {
        getUserInfo (state, action) {
            state.data = action.payload
            console.log(state)
        }
    }
})

export const {getUserInfo} = UserSlice.actions
export default UserSlice.reducer
