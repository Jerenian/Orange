import { createSlice } from "@reduxjs/toolkit";
import type { IFavoriteData, IFavorite } from "../../types";
import { data } from "react-router";


let initialState: IFavoriteData = {
    data:[
    ]
}

export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers : {
        getFavorite (state, action) {
            console.log(action.payload)
            if(action?.payload){
                state.data = action.payload
            }
            else{
                state.data = []
            }
            console.log(state.data)
        }
    }
})

export const {getFavorite} = FavoriteSlice.actions
export default FavoriteSlice.reducer
