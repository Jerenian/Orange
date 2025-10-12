import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct, ICreateType } from "../types";


export const CreateItemsApi = createApi({
    reducerPath: 'createItems',
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
        createType : builder.mutation<any, any>({
            query: (data) => {
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('img', data.file[0])
                return{
                url: '/types',
                method: "POST",
                body: formData,
                //formdata: true,
                }
            },
                  invalidatesTags: ['File'],
        }),
        createProduct: builder.mutation<IProduct[], string[] | null>({
            query: (credentials) => ({
                url: '/products',
                method: "POST",
                body: credentials
                
            }),
        })
    })

})
export const {useCreateProductMutation, useCreateTypeMutation } = CreateItemsApi