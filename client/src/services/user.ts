import type { RootState } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUserResponse, ILoginRequest, IUser } from "../types";
import { register } from "swiper/element";

export const UserApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/api/user",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
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
        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected'
        })   
    })
})
export const { useRegisterMutation, useLoginMutation, useProtectedMutation } = UserApi
// допилить по https://codesandbox.io/p/sandbox/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication-with-extrareducers?file=%2Fsrc%2Fapp%2Fservices%2Fauth.ts%3A9%2C21&from-embed