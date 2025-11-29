import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IOrdersData } from "../types";

export const OrderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/order`,

        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken')
            if(token) {
                headers.set('authorization', `Berear ${token}`)
            }
            return headers
        }

    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation<IOrdersData, null>({
            query: (credentials) =>({
                    url: '/',
                    method: 'POST',
                    body: credentials
                })
            }),
        getOrders: builder.query<IOrdersData, null>({
            query: () => '/'
        }),
        removeOrder: builder.mutation<string, null>({
            query: (id) => ({
                url: '/',
                method: "DELETE",
                body: {id}  
            })
        }),
        changeOrder: builder.mutation<string, null>({
            query: (id) => ({
                url: '/',
                method: "PUT",
                body: {id}  
            })
        }),
    }),
})
export const {useCreateOrderMutation, useGetOrdersQuery, useChangeOrderMutation, useRemoveOrderMutation} = OrderApi

