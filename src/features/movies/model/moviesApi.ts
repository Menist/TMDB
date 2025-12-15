import {baseApi} from "../../../app/providers";
import type {
  MovieActorsResponseSchemaType,
  MovieDetailsSchemaType,
  UpcomingResponseSchemaType,
  MoviesResponseSchemaType
} from "../../../shared/api/schemas";
import {moviesResponseSchema, upcomingResponseSchema} from "../../../shared/api/schemas";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<MoviesResponseSchemaType, void>({
      query: () => "movie/popular",
      providesTags: ["Movies"],
      extraOptions: {dataSchema: moviesResponseSchema}
    }),

    getTopRated: build.query<MoviesResponseSchemaType, void>({
      query: () => "movie/top_rated",
      providesTags: ["Movies"],
      extraOptions: {dataSchema: moviesResponseSchema}
    }),
    getUpcoming: build.query<UpcomingResponseSchemaType, void>({
      query: () => "movie/upcoming",
      providesTags: ["Movies"],
      extraOptions: {dataSchema: upcomingResponseSchema}
    }),
    getNowPlaying: build.query<MoviesResponseSchemaType, void>({
      query: () => "movie/now_playing",
      providesTags: ["Movies"],
    })
    , getDetails: build.query<MovieDetailsSchemaType, number>({
      query: (movie_id) => `movie/${movie_id}`,
      providesTags: ["Movies"],
    }),
    getActors: build.query<MovieActorsResponseSchemaType, number>({
      query: (movie_id) => `movie/${movie_id}/credits`,
      providesTags: ["Movies"],
    }),
    getSimilar: build.query<MoviesResponseSchemaType, number>({
      query: (movie_id) => `movie/${movie_id}/similar`,
      providesTags: ["Movies"],
    }),
    getSearchMovie: build.query<MoviesResponseSchemaType, string>({
      query: (text) => `/search/movie?query=${text}`,
      providesTags: ["Movies"],
    }),
    getInfiniteSearchMovie: build.infiniteQuery<
      MoviesResponseSchemaType,
      { searchText: string },
      number
    >({
      query: ({pageParam = 1, queryArg}) => {
        const searchText = queryArg.searchText;
        return `/search/movie?query=${searchText}&page=${pageParam}`;
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      },
      providesTags: ['Movies'],
      extraOptions: {dataSchema: moviesResponseSchema}
    }),
    getTopRatedMovies: build.infiniteQuery<
      MoviesResponseSchemaType, void, number
    >({
      query: ({pageParam = 1}) => `/movie/top_rated?page=${pageParam}`,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      },
      providesTags: ['Movies'],
      extraOptions: {dataSchema: moviesResponseSchema}
    }),
    getInfinitePopularMovies: build.infiniteQuery<
      MoviesResponseSchemaType, void, number
    >({
      query: ({pageParam = 1}) => `/movie/popular?page=${pageParam}`,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      },
      providesTags: ['Movies'],
      extraOptions: {dataSchema: moviesResponseSchema}
    }),
    getInfiniteUpcoming: build.infiniteQuery<
      UpcomingResponseSchemaType, void, number
    >({
      query: ({pageParam = 1}) => `/movie/upcoming?page=${pageParam}`,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      },
      providesTags: ['Movies'],
      extraOptions: {dataSchema: upcomingResponseSchema}
    }),
    getInfiniteNowPlaying: build.infiniteQuery<
      MoviesResponseSchemaType, void, number
    >({
      query: ({pageParam = 1}) => `/movie/now_playing?page=${pageParam}`,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      },
      extraOptions: {dataSchema: moviesResponseSchema},
      providesTags: ['Movies']
    }),
    getInfiniteSortMovies: build.infiniteQuery<
      MoviesResponseSchemaType,
      { sortBy: string; rating: { min: number; max: number } },
      number
    >({
      query: ({pageParam = 1, queryArg}) => ({
        url: "discover/movie",
        params: {
          sort_by: queryArg.sortBy,
          page: pageParam,
          'vote_average.gte': queryArg.rating.min,
          'vote_average.lte': queryArg.rating.max
        }
      }),
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
      },
      providesTags: ["Movies"],
      extraOptions: {dataSchema: moviesResponseSchema}
    })
    //fix rating
    //    getInfiniteSortMovies: build.infiniteQuery<
    //       MoviesResponseSchemaType,
    //       { sortBy: string },
    //       number
    //     >({
    //       query: ({ pageParam = 1, queryArg }) => {
    //         // базовые параметры
    //         const params: Record<string, any> = {
    //           sort_by: queryArg.sortBy,
    //           page: pageParam,
    //         };
    //
    //         if (queryArg.sortBy.includes('vote_average')) {
    //           params.vote_count_gte = 50;
    //         }
    //
    //         return {
    //           url: "discover/movie",
    //           params,
    //         };
    //       },
    //       infiniteQueryOptions: {
    //         initialPageParam: 1,
    //         getNextPageParam: (lastPage) =>
    //           lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    //       },
    //       providesTags: ["Movies"],
    //     })
  })
})
export const {
  useGetNowPlayingQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
  useGetDetailsQuery,
  useGetActorsQuery,
  useGetSimilarQuery,
  useGetTopRatedMoviesInfiniteQuery,
  useGetInfinitePopularMoviesInfiniteQuery,
  useGetInfiniteSearchMovieInfiniteQuery,
  useGetInfiniteUpcomingInfiniteQuery,
  useGetInfiniteNowPlayingInfiniteQuery,
  useGetInfiniteSortMoviesInfiniteQuery
} = moviesApi
