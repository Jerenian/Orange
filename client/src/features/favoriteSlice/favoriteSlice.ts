import { createSlice } from "@reduxjs/toolkit";
import type { IFavoriteData } from "../../types";


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
            if(action?.payload)
            {
                state.data = action.payload
                state.idList = state.data?.map(item => item.productId)
            }
            else
            {
                state.data = []
                state.idList = []
            }
        },
    }
})

export const {getFavorite} = FavoriteSlice.actions
export default FavoriteSlice.reducer
