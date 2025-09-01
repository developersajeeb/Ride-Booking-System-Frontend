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

    allRides: builder.query({
      query: () => ({
        url: "/rides/all-rides-for-driver",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    respondToRideRequest: builder.mutation({
      query: ({ rideId, response }: { rideId: string; response: "ACCEPTED" | "REJECTED" }) => ({
        url: `/rides/${rideId}/respond`,
        method: "PATCH",
        data: { response },
      }),
      invalidatesTags: ["RIDE"],
    }),

    updateRideStatus: builder.mutation({
      query: ({ rideId, status }: { rideId: string; status: "PICKED_UP" | "IN_TRANSIT" | "COMPLETED" }) => ({
        url: `/rides/${rideId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
    }),

    cancelRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestRideMutation,
  useUserAllRidesQuery,
  useUpdateProfileInfoMutation,
  useAllRidesQuery,
  useRespondToRideRequestMutation,
  useUpdateRideStatusMutation,
  useCancelRideMutation,
} = rideApi;