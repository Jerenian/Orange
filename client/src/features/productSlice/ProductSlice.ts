import { createSlice } from "@reduxjs/toolkit";



export const ProductSlice = createSlice({
    name: 'product',
    initialState : {
        product: null,
        search: null,
        data: [],
    },
    reducers : {
        minPriceOfTheType: (state, acitons) => {
            console.log(acitons.payload)
            state.product = acitons.payload
        },
        searchItems: (state, actions) => {
            state.search = actions.payload
            console.log(actions.payload)

        },
        allProducts: (state, {payload}) => {
            console.log(payload)
            if(payload){
                state.data = payload?.filter(item => item)
            }
            
        }
    }
})

export const {minPriceOfTheType, searchItems, allProducts} = ProductSlice.actions
export default ProductSlice.reducer
