import type { RootState } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUserResponse, ILoginRequest, IUser } from "../types";
import { register } from "swiper/element";



export const UserApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/api/user",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken')
            console.log(token)
            if(token) {
                headers.set('authorization', `Berear ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({

        register: builder.mutation<any, any>({
            query: (body) => ({
                url: '/register',
                method: "POST",
                body: body
            })
        }),

        login: builder.mutation<IUserResponse, ILoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: "POST",
                body: credentials
            })
        }),
        check: builder.query<IUserResponse, null>({
            query: () => '/check'
        }),
        refresh: builder.query<IUserResponse, null>({
            query: () => '/refresh'
        }),
 
    })
})
export const { useRegisterMutation, useLoginMutation, useRefreshQuery, useCheckQuery } = UserApi
