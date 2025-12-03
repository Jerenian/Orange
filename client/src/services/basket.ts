import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";


export const BasketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/basket`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken')

            if(token) {
                headers.set('authorization', `Berear ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        addBasket : builder.mutation({
            query: (data) => {
                if(data.palette){
                    return {
                        url: '',
                        method: "POST",
                        body: {id: data.id, palette: data.palette}
                    }
                } else {
                    return {
                        url: '',
                        method: "POST",
                        body: {id: data.id}
                    }
                }

            }
        }),
        getBasket: builder.query<any, null>({
            query: () => '/'
        }),
        getProducts: builder.mutation<IProduct[], string[] | null>({
            query: (credentials) => ({
                url: '/products',
                method: "POST",
                body: {credentials}
            })
        }),
        remove: builder.mutation<IProduct[], string[] | null>({
            query: (credentials) => ({
                url: '/',
                method: "DELETE",
                body: {credentials}
            })
        }),
        payment:  builder.mutation<any, string[] | null>({
            query: (price) => ({
                url: '/payment',
                method: "POST",
                body: {price}
            })
        }),
        clear: builder.mutation<string, string>({
            query: () => ({
                url: '/clear',
                method: "DELETE",
                body: ''
            })
        })
    })

})
export const {useAddBasketMutation, useGetBasketQuery, useGetProductsMutation, useRemoveMutation, usePaymentMutation, useClearMutation} = BasketApi