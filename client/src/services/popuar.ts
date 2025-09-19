import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";
export const PopularApi = createApi({
    reducerPath: 'PopularApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/popular'}),
    endpoints : (builder) => ({

        getPopular: builder.query<IProduct[], null>({
            query:() => ''
        })

        

    })
})