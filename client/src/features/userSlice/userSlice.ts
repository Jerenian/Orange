import { createSlice } from "@reduxjs/toolkit";


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
            console.log(action.payload)
            if(action.payload){
            state.data.id = action?.payload?.id
            state.data.login = action?.payload?.login
            state.data.name = action?.payload?.name
            state.data.role = action?.payload?.role
            } else {
                state.data = initialState.data
            }
        },
        logOut: (state) => {
            state.data = initialState.data
            localStorage.clear()
        }
    }
})

export const {getUserInfo, logOut} = UserSlice.actions
export default UserSlice.reducer
