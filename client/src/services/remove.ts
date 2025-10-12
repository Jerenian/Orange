import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct, ICreateType } from "../types";


export const RemoveItemsApi = createApi({
    reducerPath: 'removeItems',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api/',
        
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken')
            if(token) {
                headers.set('authorization', `Berear ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        removeType : builder.mutation<any, any>({
            query: (id) => {
                console.log(id)
                return {
                url: '/types',
                method: "DELETE",
                body: {id},
                }
            },
        }),
        removeProduct: builder.mutation<IProduct[], string[] | null>({
            query: (id) => ({
                    url: '/products',
                    method: "DELETE",
                    body: id,
                })
            }),
        })
    })

export const {useRemoveProductMutation, useRemoveTypeMutation } = RemoveItemsApi