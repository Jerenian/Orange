import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "../services/product";
import { setupListeners } from "@reduxjs/toolkit/query";
import { typeApi } from "../services/type";
import ModalReducer from "../features/modalSlice/modalSlice"
import { UserApi } from "../services/user";
import TypeReducer from '../features/TypeSlice/TypeSlice'
import {FavoriteApi} from '../services/favorite'
import  FavoriteReudcer from "../features/favoriteSlice/favoriteSlice";
import userRducer from "../features/userSlice/userSlice"
import { CreateItemsApi } from "../services/create";
import { RemoveItemsApi } from "../services/remove";
export const store = configureStore({
    reducer: {
        [ProductApi.reducerPath] : ProductApi.reducer,
        [typeApi.reducerPath] : typeApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [FavoriteApi.reducerPath]: FavoriteApi.reducer,
        [CreateItemsApi.reducerPath]: CreateItemsApi.reducer,
        [RemoveItemsApi.reducerPath]: RemoveItemsApi.reducer,
        "modal" : ModalReducer,
        "type": TypeReducer,
        "favorite": FavoriteReudcer,
        "user": userRducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(ProductApi.middleware, typeApi.middleware, UserApi.middleware, FavoriteApi.middleware, CreateItemsApi.middleware, RemoveItemsApi.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch