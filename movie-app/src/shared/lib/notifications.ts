import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const showErrorToast = (error: FetchBaseQueryError | SerializedError | undefined) => {
  let message = 'Произошла ошибка'

  if (!error) {
    toast.error(message)
    return
  }

  if ('status' in error) {
    const apiErrorMessage = (error.data as { message?: string })?.message

    switch (error.status) {
      case 'FETCH_ERROR':
      case 'TIMEOUT_ERROR':
        message = 'Ошибка сети. Проверьте подключение к интернету.'
        break
      case 403:
        message = apiErrorMessage || 'Доступ запрещён. Проверьте API ключ.'
        break
      case 404:
        message = apiErrorMessage || 'Данные не найдены.'
        break
      case 500:
        message = apiErrorMessage || 'Ошибка сервера. Попробуйте позже.'
        break
      default:
        message = apiErrorMessage || 'Произошла ошибка при загрузке данных'
    }
  } else if ('message' in error) {
    message = error.message || 'Произошла ошибка'
  }

  toast.error(message)
}
