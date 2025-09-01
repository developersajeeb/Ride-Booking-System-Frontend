/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IRide } from "@/types";
import { baseApi } from "../baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/rides/request",
        method: "POST",
        data: rideData,
      }),
      invalidatesTags: ["RIDE"],
    }),

    userAllRides: builder.query<{ data: IRide[]; meta: any }, Record<string, any>>({
      query: (params) => ({
        url: "/rides/rider-history",
        method: "GET",
        params: params,
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: { data: { data: IRide[]; meta: any } }) => ({
        data: response.data.data, 
        meta: response.data.meta,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: (userInfo) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestRideMutation,
  useUserAllRidesQuery,
  useUpdateProfileInfoMutation
} = rideApi;