import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITypes } from "../types";
export const typeApi = createApi({
    reducerPath: "TypeApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/types'}),
    endpoints: (builder) => ({
        getAllTypes : builder.query<ITypes[], null>({
            query:() => '/'
        }),
    })
})

export const {useGetAllTypesQuery} = typeApi