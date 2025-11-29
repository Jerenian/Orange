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
import { ChangeItemsApi } from "../services/change";
import { FilterSortApi } from "../services/filterSort";
import { BasketApi } from "../services/basket";
import  ProductReducer from "../features/productSlice/ProductSlice";
import BasketReducer from "../features/basketSlice/basketSlice"
import OrderReducer  from "../features/orderSlice/orderSlice";
import { OrderApi } from "../services/order";
import MessageReducer from '../features/messageSlice/messageSlice'
export const store = configureStore({
    reducer: {
        [ProductApi.reducerPath] : ProductApi.reducer,
        [typeApi.reducerPath] : typeApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [FavoriteApi.reducerPath]: FavoriteApi.reducer,
        [CreateItemsApi.reducerPath]: CreateItemsApi.reducer,
        [RemoveItemsApi.reducerPath]: RemoveItemsApi.reducer,
        [ChangeItemsApi.reducerPath]: ChangeItemsApi.reducer,
        [FilterSortApi.reducerPath]: FilterSortApi.reducer,
        [BasketApi.reducerPath]: BasketApi.reducer,
        [OrderApi.reducerPath]: OrderApi.reducer,
        "modal" : ModalReducer,
        "type": TypeReducer,
        "favorite": FavoriteReudcer,
        "user": userRducer,
        "product": ProductReducer,
        "basket": BasketReducer,
        "orders" : OrderReducer,
        "message" : MessageReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            ProductApi.middleware,
            typeApi.middleware, 
            UserApi.middleware,
            FavoriteApi.middleware,
            CreateItemsApi.middleware,
            RemoveItemsApi.middleware,
            ChangeItemsApi.middleware,
            FilterSortApi.middleware,
            BasketApi.middleware,
            OrderApi.middleware
        ),
    devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch