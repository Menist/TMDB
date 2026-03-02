import {baseApi} from "@/shared/api";
import type {DiscoverParams} from "../model/types";
import {validateResponse} from "./validation";
import type {
  Credits,
  GenresResponse,
  MovieDetails,
  PopularMoviesResponse
} from "../model/schemas";
import {PopularMoviesResponseSchema, GenresResponseSchema, CreditsSchema, MovieDetailsSchema} from "../model/schemas";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.infiniteQuery<PopularMoviesResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        },
      },
      query({pageParam}) {
        return `/movie/popular?page=${pageParam}`
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
    getTopRatedMovies: builder.infiniteQuery<PopularMoviesResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        },
      },
      query({pageParam}) {
        return `/movie/top_rated?page=${pageParam}`
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
    getUpcomingMovies: builder.infiniteQuery<PopularMoviesResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        }
      },
      query({pageParam}) {
        return `/movie/upcoming?page=${pageParam}`
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
    getNowPlayingMovies: builder.infiniteQuery<PopularMoviesResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        },
      },
      query({pageParam}) {
        return `/movie/now_playing?page=${pageParam}`
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
    searchMovies: builder.infiniteQuery<PopularMoviesResponse, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        },
      },
      query({queryArg, pageParam}) {
        return `/search/movie?query=${queryArg}&page=${pageParam}`
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
      transformResponse: validateResponse(MovieDetailsSchema)
    }),
    getMovieCredits: builder.query<Credits, number>({
      query: (id) => `/movie/${id}/credits`,
      transformResponse: validateResponse(CreditsSchema)
    }),
    getSimilarMovies: builder.query<PopularMoviesResponse, number>({
        query: (id) => `/movie/${id}/similar`,
        transformResponse: validateResponse(PopularMoviesResponseSchema)
      }
    ),
    getGenres: builder.query<GenresResponse, void>({
      query: () => `/genre/movie/list`,
      transformResponse: validateResponse(GenresResponseSchema)
    }),
    discover: builder.infiniteQuery<PopularMoviesResponse, DiscoverParams, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPageParam + 1
          }
          return undefined
        },
      },
      query: ({queryArg, pageParam}) => {
        const {_key, ...filters} = queryArg  // ← убрали _key
        let url = `/discover/movie?page=${pageParam}`
        url += `&vote_count.gte=100`

        if (filters.with_genres) {
          url += `&with_genres=${filters.with_genres}`
        }

        if (filters.primary_release_year) {
          url += `&primary_release_year=${filters.primary_release_year}`
        }

        if (filters['vote_average.gte']) {
          url += `&vote_average.gte=${filters['vote_average.gte']}`
        }

        if (filters['vote_average.lte']) {
          url += `&vote_average.lte=${filters['vote_average.lte']}`
        }

        if (filters.sort_by) {
          url += `&sort_by=${filters.sort_by}`
        }

        return url
      },
      transformResponse: validateResponse(PopularMoviesResponseSchema)
    }),
  }),
})

export const {
  useGetTopRatedMoviesInfiniteQuery,
  useGetPopularMoviesInfiniteQuery,
  useGetNowPlayingMoviesInfiniteQuery,
  useGetUpcomingMoviesInfiniteQuery,
  useSearchMoviesInfiniteQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useDiscoverInfiniteQuery,
  useGetGenresQuery
} = movieApi
