import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { sendresponse } from '../types/messagetype'



// Define a service using a base URL and expected endpoints
export const conversationapi = createApi({
  reducerPath: 'conversationapi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL ,credentials:"include" }),
  tagTypes:["message"],
  endpoints: (build) => ({
    sendmessage: build.mutation<sendresponse,{receiverid:string,message:string}>({
      query: (data) => ({

        url:"/message/sendmessage",
        method:"POST",
        body:data,

      }),
      invalidatesTags:["message"]
    }),


    getmessages: build.query({
      query: (data) => ({

        url:`/message/getconversation/${data}`,
        method:"GET",


      }),
      providesTags:["message"]
    }),







   





// 




  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendmessageMutation,useGetmessagesQuery,useLazyGetmessagesQuery} = conversationapi