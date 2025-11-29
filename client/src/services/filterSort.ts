import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";

export const FilterSortApi = createApi({
    reducerPath: 'filterSortApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/products`,
    }),
    endpoints: (builder) => ({
        filter: builder.mutation<IProduct[], null>({
        query: (credentials) =>({
                url: 'filter',
                method: 'POST',
                body: credentials
            })
        }),
        sort: builder.mutation<IProduct, string>({
            query: (credentials) =>({
                url: 'sort',
                method: 'POST',
                body: credentials
            })
        }),
        search: builder.query<IProduct[], string>({
            query: (credentials) => `/search/${credentials}`,           
        }),
    }),
})
export const {useFilterMutation, useSortMutation, useSearchQuery} = FilterSortApi

