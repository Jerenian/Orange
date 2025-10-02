import { createSlice } from "@reduxjs/toolkit";
import { ProductApi } from "../../services/product";
import type { IProduct } from "../../types";
import { data } from "react-router";
import { useDispatch } from "react-redux";

const initialState : any = {
    product: [{
        typeId: '',
        items: 0
    }]

}


export const TypeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            ProductApi.endpoints.getAllProducts.matchFulfilled,
            (state, {payload}) => {
                state.product = Object.entries(
                payload.reduce((acc: any, item) => {
                    const category = item.typeId;
                    const price = item.price
                    if (!acc[category]) {
                    acc[category] = {
                        typeId: category,
                        items: 0
                    };
                    }

                    acc[category].items.length ? price !== null && price < acc[category].items ? acc[category].items = price : null : acc[category].items = price;
                    return acc;
                }, {})
                ).map(([key, value]) => value);

                console.log(state);
            }
        )
    }
})

export default TypeSlice.reducer