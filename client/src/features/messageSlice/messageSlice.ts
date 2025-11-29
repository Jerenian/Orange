import { createSlice } from "@reduxjs/toolkit";

const initialState = {visible: false}
export const meassageSlice = createSlice({
    name: 'meassage',
    initialState,
    reducers : {
        changeMessage: (state, action?) => {
            state.visible = !state.visible
            if(action?.payload) {
                state.visible = false
            }
        }
    }
})

export const {changeMessage} = meassageSlice.actions
export default meassageSlice.reducer
