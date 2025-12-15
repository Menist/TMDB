import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseQueryWithZodValidation} from "./baseQueryWithZodValidation";

export const baseApi = createApi({
  reducerPath: "tmdbApi",
  tagTypes: ["Movies"],
  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {

    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
      },
    })(args, api, extraOptions)

    return result
  }),
  endpoints: () => ({}),
})
