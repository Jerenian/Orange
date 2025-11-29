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
        role: "",
    }
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers : {
        getUserInfo (state, action) {
            //////console.log(action)
            state.data.id = action?.payload?.id
            state.data.login = action?.payload?.login
            state.data.name = action?.payload?.name
            state.data.role = action?.payload?.role

        },
        logOut: (state) => {
            state.data = initialState.data
            localStorage.clear()
        }
    }
})

export const {getUserInfo, logOut} = UserSlice.actions
export default UserSlice.reducer
