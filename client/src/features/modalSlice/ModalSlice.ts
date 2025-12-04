import { createSlice } from "@reduxjs/toolkit";


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
    },
    editProduct: {
        visible: false,
        id: '',
        name:'',
        img: '',
        description: '',
        price:'',
        isPopular: false,
        palette: ''
    },
    number: false,
    deleteType: {
        visible: false,
        typeId: ''
    },
    deleteProduct: {
        visible: false,
        id: ''
    },
    menu: false,
    productInfo: {
        visible: false,
        product: {
            id: '',
            name:'',
            img: '',
            description: '',
            price:'',
            isPopular: false
        }
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
        getTypeId(state, actions){
            state.typeId = actions?.payload
        },
        changeProductModal (state, actions?) {
            state.createProduct = !state.createProduct
            actions ? state.typeId = actions?.payload : null
        },
        changeEditType(state, actions?) {
            state.editType.visible = !state.editType.visible
            if(actions?.payload){
                state.editType.id = actions?.payload.id
                state.editType.name = actions?.payload.name
                state.editType.img = actions?.payload.img
            }

        },
        changeEditProduct(state, actions) {
            state.editProduct.visible = !state.editProduct.visible
            if(actions?.payload){
                state.editProduct.id = actions.payload.id
                state.editProduct.name = actions.payload.name
                state.editProduct.img = actions.payload.img
                state.editProduct.description = actions.payload.description
                state.editProduct.price = actions.payload.price
                state.editProduct.isPopular = actions.payload.isPopular
                state.editProduct.palette = actions.payload.palette
            }
        },
        changeNumber(state) {
            state.number = !state.number
        },
        changeDeleteType(state, actions){
            state.deleteType.visible = !state.deleteType.visible
            if(actions?.payload){
                state.deleteType.typeId = actions.payload
            }
        },
        changeDeleteProduct(state, actions){
            state.deleteProduct.visible = !state.deleteProduct.visible
            if(actions?.payload){
                state.deleteProduct.id = actions.payload
            }
        },
        changeMenu(state, actions){
            state.menu = !state.menu
        },
        changeProductInfo(state, actions){
            state.productInfo.visible = !state.productInfo.visible
            if(actions?.payload){
                state.productInfo.product.id = actions.payload.id
                state.productInfo.product.name = actions.payload.name
                state.productInfo.product.img = actions.payload.img
                state.productInfo.product.description = actions.payload.description
                state.productInfo.product.price = actions.payload.price
                state.productInfo.product.isPopular = actions.payload.isPopular
            }
        }
    }
})
export const {changePaymentModal, changeTypeModal, changeProductModal, changeEditType, getTypeId, changeEditProduct, changeNumber, changeDeleteType, changeMenu, changeProductInfo, changeDeleteProduct} = ModalSlice.actions
export default ModalSlice.reducer