import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "../services/product";
import { setupListeners } from "@reduxjs/toolkit/query";
import { typeApi } from "../services/type";
import ModalReducer from "../features/modalSlice/modalSlice"
import  authSlice  from "../features/userSlice/auth";
import { UserApi } from "../services/user";
import TypeReducer from '../features/TypeSlice/TypeSlice'
export const store = configureStore({
    reducer: {
        [ProductApi.reducerPath] : ProductApi.reducer,
        [typeApi.reducerPath] : typeApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        "modal" : ModalReducer,
        "auth": authSlice,
        "type": TypeReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(ProductApi.middleware, typeApi.middleware, UserApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch