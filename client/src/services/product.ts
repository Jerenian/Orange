import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";

export const ProductApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], null>({
            query:() => 'products/',
        }),
        getOneProduct: builder.query<IProduct, string>({
            query:(id) => `products/${id}/`
        }),
        getByTypeProduct: builder.query<IProduct[], string>({
            query:(typeId) =>  `products?typeId=${typeId}`,            
        })
    }),
})
export const {useGetAllProductsQuery, useGetByTypeProductQuery} = ProductApi

