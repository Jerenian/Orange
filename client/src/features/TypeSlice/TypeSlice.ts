import { createSlice } from "@reduxjs/toolkit";
import { ProductApi } from "../../services/product";


const initialState = {
    product: [{
        typeId: '',
        items: 0,
    }],
    types: []
}


export const TypeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        getTypes: (state, {payload}) => {
            state.types = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            ProductApi.endpoints.getAllProducts.matchFulfilled,
            (state, {payload}) => {
                const result = payload.reduce((acc, item) => {
                const { typeId, price } = item;
                
                if (!acc.find(obj => obj.typeId === typeId)) {
                    acc.push({ typeId, prices: [] });
                }
                
                const typeObj = acc.find(obj => obj.typeId === typeId);
                typeObj.prices.push(price);
                
                return acc;
                }, []);

                for(let i = 0; i < result.length; i++){
                    result[i].prices.sort(function (a, b) {
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                return 0;
                })
                }
                state.product  = result.map(item => {
                    return {
                        typeId: item.typeId,
                        items: item.prices[0]
                    }
                })
            }
        )
    }
})
export const {getTypes} = TypeSlice.actions
export default TypeSlice.reducer