import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { getallposttype } from '../types/posttype'


// Define a service using a base URL and expected endpoints
export const postapi = createApi({
  reducerPath: 'postapi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL ,credentials:"include" }),
  tagTypes:["post"],
  endpoints: (build) => ({
    createpost: build.mutation({
      query: (data) => ({

        url:"/post/createpost",
        method:"POST",
        body:data,

      }),
      invalidatesTags:["post"]
    }),


    bookmarkpost: build.mutation({
      query: (data) => ({

        url:"/post/bookmark",
        method:"POST",
        body:data
      }),
      invalidatesTags:["post"]

    }),

    commentpost: build.mutation({
      query: (data) => ({

        url:"/post/comment",
        method:"POST",
        body:data
      }),
      invalidatesTags:["post"]

    }),




    like: build.mutation({
      query: (data) => ({

        url:"/post/like",
        method:"POST",
        body:data
      }),
      invalidatesTags:["post"]

    }),

    deletecomment: build.mutation({
      query: (data) => ({

        url:"/post/deletecomment",
        method:"POST",
        body:data
      }),
      invalidatesTags:["post"]

    }),



    deletepost: build.mutation({
      query: (data) => ({

        url:"/post/deletepost",
        method:"POST",
        body:data
      }),
      invalidatesTags:["post"]

    }),



    getallpost: build.query<getallposttype,void>({
      query: () => ({

        url:"/post/getallpost",
        method:"GET",

      }),
      providesTags:["post"]

    }),



    getallstory: build.query<getallposttype,void>({
      query: () => ({

        url:"/post/getallstory",
        method:"GET",

      }),
      providesTags:["post"]

    }),


    getbookmarkpost: build.query<getallposttype,void>({
      query: () => ({

        url:"/post/getbookmarkpost",
        method:"GET",

      }),
      providesTags:["post"]

    }),



    getownpost: build.query<getallposttype,void>({
      query: () => ({

        url:"/post/getownpost",
        method:"GET",

      }),
      providesTags:["post"]

    }),






// 




  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreatepostMutation,useBookmarkpostMutation,useCommentpostMutation,useDeletecommentMutation,useDeletepostMutation,useGetallpostQuery,useGetbookmarkpostQuery,useGetownpostQuery,useLikeMutation ,useGetallstoryQuery} = postapi