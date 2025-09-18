import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "../services/product";
import { setupListeners } from "@reduxjs/toolkit/query";
import { typeApi } from "../services/type";
export const store = configureStore({
    reducer: {
        [ProductApi.reducerPath] : ProductApi.reducer,
        [typeApi.reducerPath] : typeApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(ProductApi.middleware, typeApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch