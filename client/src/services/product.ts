import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";

export const ProductApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/`,
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], null>({
            query:() => 'products/',
        }),
        getOneProduct: builder.query<IProduct, string>({
            query:(id) => `products/${id}/`
        }),
        getByTypeProduct: builder.query<IProduct[], string>({
            query:(typeId) =>  `products?typeId=${typeId}`,            
        }),
        getFlowers: builder.query({
            query: () => '/flowers'
        })
    }),
})
export const {useGetAllProductsQuery, useGetByTypeProductQuery, useGetFlowersQuery} = ProductApi

