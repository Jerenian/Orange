import { createSlice } from "@reduxjs/toolkit";
import type { IFavoriteData, IFavorite } from "../../types";
import { data } from "react-router";


let initialState: IFavoriteData  = {
    data:[
    ],
    idList: []
}

export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers : {
        getFavorite (state, action) {
            if(action?.payload){
                state.data = action.payload
                state.idList = state.data?.map(item => item.productId)
                console.log(state.idList)
            }
            else{
                state.data = []
                state.idList = []
            }
            console.log(state)
        },
    }
})

export const {getFavorite} = FavoriteSlice.actions
export default FavoriteSlice.reducer
