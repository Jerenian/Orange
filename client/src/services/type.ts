import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITypes } from "../types";
export const typeApi = createApi({
    reducerPath: "TypeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/types`,
    }),
    endpoints: (builder) => ({
        getAllTypes : builder.query<ITypes[], null>({
            query:() => '/'
        }),
    })
})

export const {useGetAllTypesQuery} = typeApi