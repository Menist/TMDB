import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type {ConfigResponse} from "../../../common/types";

export const configApi = createApi({
  reducerPath: "configApi",
  tagTypes: ["Config"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
    },
  }),
  endpoints: (build) => ({
    getConfiguration: build.query<ConfigResponse, void>({
      query: () => "configuration",
      providesTags: ["Config"],
    }),
  }),
})
export const {useGetConfigurationQuery} = configApi
