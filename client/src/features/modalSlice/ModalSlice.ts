import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";


let initialState = {
    payment: false,
    createType: false,
    createProduct: false
}
export const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers : {
        changePaymentModal (state) {
            state.payment = !state.payment
        },
        changeTypeModal (state) {
            state.createType = !state.createType
        },
        changeProductModal (state) {
            state.createProduct = !state.createProduct
        },
    }
})
export const {changePaymentModal, changeTypeModal, changeProductModal} = ModalSlice.actions
export default ModalSlice.reducer