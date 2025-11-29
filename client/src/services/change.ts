import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct, ICreateType } from "../types";
import { data } from "react-router";


export const ChangeItemsApi = createApi({
    reducerPath: 'changeItems',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}api/`,
        
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
                formData.append('id', data.id)
                formData.append('name', data.name)
                formData.append('img', data.file[0])
                return{
                url: '/types',
                method: "PUT",
                body: formData,
                }
            },
        }),
        changeProduct: builder.mutation<IProduct[], string[] | null>({
            query: (data) => {
                    const formData = new FormData() 
                    if(data?.file.length) {
                    formData.append('name', data.name)
                    formData.append('price', data.price)
                    formData.append('description', data.description)
                    formData.append('img', data.file[0])
                    formData.append('isPopular', data.isPopular)
                    formData.append('id', data.id)
                    formData.append('palette', data.palette)
                        return{
                            url: '/products',
                            method: "PUT",
                            body:formData,
                        }
                    } else {
                        return{
                            url: '/products',
                            method: "PUT",
                            body:data,
                        }
                    }

            }
        }),
        changePopular: builder.mutation({
            query: (id) => ({
                url: '/products/popular',
                method: "PUT",
                body: {id: id, isPopular: false}
            })
        })
    })

})
export const {useChangeProductMutation, useChangeTypeMutation, useChangePopularMutation } = ChangeItemsApi