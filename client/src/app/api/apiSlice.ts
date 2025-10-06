import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../features/userSlice/authSlice"
import type { RootState } from "@reduxjs/toolkit/query"



export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/user",
    //credentials: 'include',
    prepareHeaders: (headers, {getState}: RootState ) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403){
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult);
        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshResult.data, user}))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }


    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

