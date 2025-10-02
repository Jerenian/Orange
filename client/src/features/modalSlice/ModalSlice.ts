import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";


let initialState = {visible: false}
export const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers : {
        changeModal (state) {
            state.visible = !state.visible
        }
    }
})
export const {changeModal} = ModalSlice.actions
export default ModalSlice.reducer