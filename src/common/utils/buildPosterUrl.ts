import placeholder from '../../shared/assets/placeholder.jpg'
import type {BaseMovieSchemaType} from "../../shared/api/schemas";

export function buildPosterUrl(movie?: BaseMovieSchemaType, baseUrl?: string) {
  if (!movie) return placeholder

  const path = movie.backdrop_path || movie.poster_path

  if (!path) return placeholder

  if (!baseUrl) return placeholder

  return baseUrl + path
}
