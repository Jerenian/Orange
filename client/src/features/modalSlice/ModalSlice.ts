import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";


let initialState = {
    payment: false,
    createType: false,
    createProduct: false,
    typeId: '',
    editType: {
        visible: false,
        id: '',
        name:'',
        img: ''
    }
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
        changeProductModal (state, actions?) {
            state.createProduct = !state.createProduct
            actions ? state.typeId = actions?.payload : null
        },
        changeEditType(state, actions?) {
            state.editType.visible = !state.editType.visible
            console.log('editSlice')
            if(actions?.payload){
                state.editType.id = actions?.payload.id
                state.editType.name = actions?.payload.name
                state.editType.img = actions?.payload.img
            }
        }
    }
})
export const {changePaymentModal, changeTypeModal, changeProductModal, changeEditType} = ModalSlice.actions
export default ModalSlice.reducer