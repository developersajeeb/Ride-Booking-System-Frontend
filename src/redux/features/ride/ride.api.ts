
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
    userAllRides: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "" }) => ({
        url: "/rides/rider-history",
        method: "GET",
        params: { page, limit, search, status },
      }),
      providesTags: ["RIDE"],
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