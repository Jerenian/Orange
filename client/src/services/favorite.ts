import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";


export const FavoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/favorite`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken')

            if(token) {
                headers.set('authorization', `Berear ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        addFavorite : builder.mutation<null, string>({
            query: (id) => ({
                url: '',
                method: "POST",
                body: {id: id}
            })
        }),
        getFavorite: builder.query<any, null>({
            query: () => '/'
        }),
        getProducts: builder.mutation<IProduct[], string[] | null>({
            query: (credentials) => ({
                url: '/products',
                method: "POST",
                body: {credentials}
            })
        })
    })

})
export const {useAddFavoriteMutation, useGetFavoriteQuery, useGetProductsMutation} = FavoriteApi