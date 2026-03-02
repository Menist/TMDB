import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {API_CONFIG} from './config'
import {toast} from 'react-toastify'
import {isErrorWithMessage} from '@/shared/lib/errorUtils'

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_CONFIG.token}`)
      return headers
    }
  })(args, api, extraOptions)

  if (result.error) {
    if ('status' in result.error) {
      switch (result.error.status) {
        case 'FETCH_ERROR':
        case 'TIMEOUT_ERROR':
          toast.error('Ошибка сети. Проверьте подключение к интернету.')
          break

        case 'PARSING_ERROR':
          toast.error('Ошибка парсинга данных.')
          break

        case 401:
        case 403:
          if (isErrorWithMessage(result.error.data)) {
            toast.error(result.error.data.message)
          } else {
            toast.error('Доступ запрещён. Проверьте API ключ.')
          }
          break

        case 404:
          toast.error('Данные не найдены.')
          break

        default:
          if (typeof result.error.status === 'number' &&
            result.error.status >= 500 &&
            result.error.status < 600) {
            toast.error('Ошибка сервера. Попробуйте позже.')
          } else {
            toast.error('Произошла ошибка при загрузке данных.')
          }
      }
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: "tmdbApi",
  tagTypes: ["Movies"],
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
})