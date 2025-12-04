import { createSlice } from "@reduxjs/toolkit";
import type { IOrdersData } from "../../types";

const initialState: IOrdersData = {data: [], active: [], quantity: []}
export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers : {
        getOrders: (state, {payload}) => {
            if(payload){
                state.data = payload?.filter(item => item)
                state.active = payload?.filter(item => !item.isHanded)
            }
        },

        removeOrder: (state, {payload}) => {
            state.data = state.active?.filter(item => item.id !== payload)
            state.active = state.active?.filter(item => item.id !== payload)
        },
        addHandedState: (state, {payload}) => {
            state.active = state.active?.filter(item => item.id !== payload)
        }
    }
})

export const {getOrders, removeOrder, addHandedState} = OrderSlice.actions
export default OrderSlice.reducer
