 
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
  }),
  overrideExisting: false,
});

export const {
  useRequestRideMutation,
  useUserAllRidesQuery,
} = rideApi;