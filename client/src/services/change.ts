import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct, ICreateType } from "../types";


export const ChangeItemsApi = createApi({
    reducerPath: 'changeItems',
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
        changeType : builder.mutation<any, any>({
            query: (data) => {
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('img', data.file[0])
                return{
                url: '/types',
                method: "POST",
                body: formData,
                }
            },
        }),
        changeProduct: builder.mutation<IProduct[], string[] | null>({
            query: (data) => {
                const formData = new FormData() 
                formData.append('name', data.name)
                formData.append('price', data.price)
                formData.append('country', data.country)
                formData.append('description', data.description)
                formData.append('length', data.lgth)
                formData.append('typeId', data.typeId)
                formData.append('img', data.file[0])
                return{
                    url: '/products',
                    method: "POST",
                    body: formData,
                }
            },
        })
    })

})
export const {useChangeProductMutation, useChangeTypeMutation } = ChangeItemsApi