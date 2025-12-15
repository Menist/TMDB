import z from "zod"
import type {ZodSchema}  from "zod"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react"
import {toast} from "react-toastify";
import {formatZodError} from "../../common/utils";

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>
const errorMessages: Record<string | number, string> = {
  FETCH_ERROR: "Памылка: няма сувязі",
  401: "Памылка: няправільны AUTH_TOKEN",
  403: "Памылка: доступ забаронены",
  404: "Памылка: рэсурс не знойдзены"
};

export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {


    const returnValue = await baseQuery(args, api, extraOptions)
    const status = returnValue.error?.status;

    const zodSchema = extraOptions?.dataSchema

    const { data } = returnValue

    if (status && errorMessages[status]) {
      toast.error(errorMessages[status]);
    }

    if (data && zodSchema) {
      try {
        zodSchema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error(`Памылка zod: ${formatZodError(error)}`);
        }
        throw error
      }
    }
    return returnValue
  }