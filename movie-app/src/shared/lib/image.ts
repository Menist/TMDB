import {API_CONFIG} from "../api";

export const getImageUrl = (path: string | null, size: string = 'w500'): string | null => {
  if (!path) return null

  return `${API_CONFIG.imageBaseUrl}/${size}${path}`
}
