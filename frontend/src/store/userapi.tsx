import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { getuser, gu } from "../types/loginpagetypes";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    mode:"cors",
    // Update this with your actual API base URL
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
      // Update the endpoint as needed
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
      // Update the endpoint as needed
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
      // Update the endpoint as needed
    }),

    getuser: builder.query<gu,void>({
      query: () => ({
        url: "/user/getuser",
        method: "GET",
      }),
      providesTags: ["user"],
      // Update the endpoint as needed
    }),

    getusersforsidebar: builder.query<getuser,void>({
      query: () => ({
        url: "/user/getusersforsidebar",
        method: "GET",
      }),
      providesTags: ["user"],
      // Update the endpoint as needed
    }),

    updateprofile: builder.mutation({
      query: (data) => ({
        url: "/user/updateprofile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],

      // Update the endpoint as needed
    }),

    sendverifyotp: builder.mutation({
      query: (data) => ({
        url: "/user/sendverifyotp",
        method: "POST",
        body: data,
      }),

      // Update the endpoint as needed
    }),
    checkverifyotp: builder.mutation({
      query: (data) => ({
        url: "/user/checkverifyotp",
        method: "POST",
        body: data,
      }),

      // Update the endpoint as needed
    }),
    sendresetotp: builder.mutation({
      query: (data) => ({
        url: "/user/sendresetotp",
        method: "POST",
        body: data,
      }),

      // Update the endpoint as needed
    }),

    checkresetotp: builder.mutation({
      query: (data) => ({
        url: "/user/checkresetotp",
        method: "POST",
        body: data,
      }),

      // Update the endpoint as needed
    }),

    newpassword: builder.mutation({
      query: (data) => ({
        url: "/user/newpassword",
        method: "POST",
        body: data,
      }),

      // Update the endpoint as needed
    }),

    followorunfollow: builder.mutation({
      query: (data) => ({
        url: "/user/followorunfollow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],

      // Update the endpoint as needed
    }),

    //
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetuserQuery,
  useUpdateprofileMutation,
  useGetusersforsidebarQuery,
  useSendresetotpMutation,
  useCheckresetotpMutation,
  useCheckverifyotpMutation,
  useSendverifyotpMutation,
  useNewpasswordMutation,
  useFolloworunfollowMutation,
} = userApi;
