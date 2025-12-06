import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const CreateItemsApi = createApi({
    reducerPath: 'createItems',
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
        createType : builder.mutation<any, any>({
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
        createProduct: builder.mutation<null, any>({
            query: (data) => {
                const formData = new FormData() 
                formData.append('name', data.name)
                formData.append('price', data.price)
                formData.append('description', data.description)
                formData.append('img', data.file[0])
                formData.append('typeId', data.typeId)
                formData.append('palette', data.palette)
                return{
                    url: '/products',
                    method: "POST",
                    body: formData,
                }
            },
        })
    })

})
export const {useCreateProductMutation, useCreateTypeMutation } = CreateItemsApi