import {
  useGetNowPlayingMoviesInfiniteQuery,
  useGetPopularMoviesInfiniteQuery,
  useGetTopRatedMoviesInfiniteQuery,
  useGetUpcomingMoviesInfiniteQuery
} from "../api/movieApi";

export const useMovieCategories = () => {
  const {
    data: popular,
    isLoading: isLoadingPopular,
    error: errorPopular,
    fetchNextPage: fetchNextPagePopular,
    hasNextPage: hasNextPagePopular,
    isFetchingNextPage: isFetchingNextPagePopular
  } = useGetPopularMoviesInfiniteQuery()
  const {
    data: topRated,
    isLoading: isLoadingTopRated,
    error: errorTopRated,
    hasNextPage: hasNextPageGetTopRatedMovies,
    isFetchingNextPage: isFetchingNextPageGetTopRatedMovies,
    fetchNextPage: fetchNextPageGetTopRatedMovies
  } = useGetTopRatedMoviesInfiniteQuery()
  const {
    data: upcoming,
    isLoading: isLoadingUpcoming,
    error: errorUpcoming,
    hasNextPage: hasNextPageGetUpcomingMovies,
    isFetchingNextPage: isFetchingNextPageGetUpcomingMovies,
    fetchNextPage: fetchNextPageGetUpcomingMovies
  } = useGetUpcomingMoviesInfiniteQuery()
  const {
    data: nowPlaying,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying,
    hasNextPage: hasNextGetNowPlayingMovies,
    isFetchingNextPage: isFetchingGetNowPlayingMovies,
    fetchNextPage: fetchNextPageGetNowPlayingMovies
  } = useGetNowPlayingMoviesInfiniteQuery()

  const allPopularMovies = popular?.pages.flatMap(page => page.results) || []
  const allTopRatedMovies = topRated?.pages.flatMap(page => page.results) || []
  const allUpcomingMovies = upcoming?.pages.flatMap(page => page.results) || []
  const allNowPlayingMovies = nowPlaying?.pages.flatMap(page => page.results) || []

  return {
    popular: {
      data: popular,
      isLoading: isLoadingPopular,
      error: errorPopular,
      allMovies: allPopularMovies,
      fetchNextPage: fetchNextPagePopular,
      hasNextPage: hasNextPagePopular,
      isFetchingNextPage: isFetchingNextPagePopular
    },
    topRated: {
      data: topRated,
      isLoading: isLoadingTopRated,
      error: errorTopRated,
      allMovies: allTopRatedMovies,
      hasNextPage: hasNextPageGetTopRatedMovies,
      isFetchingNextPage: isFetchingNextPageGetTopRatedMovies,
      fetchNextPage: fetchNextPageGetTopRatedMovies
    },
    upcoming: {
      data: upcoming,
      isLoading: isLoadingUpcoming,
      error: errorUpcoming,
      allMovies: allUpcomingMovies,
      hasNextPage: hasNextPageGetUpcomingMovies,
      isFetchingNextPage: isFetchingNextPageGetUpcomingMovies,
      fetchNextPage: fetchNextPageGetUpcomingMovies
    },
    nowPlaying: {
      data: nowPlaying,
      isLoading: isLoadingNowPlaying,
      error: errorNowPlaying,
      allMovies: allNowPlayingMovies,
      hasNextPage: hasNextGetNowPlayingMovies,
      isFetchingNextPage: isFetchingGetNowPlayingMovies,
      fetchNextPage: fetchNextPageGetNowPlayingMovies
    },

  }
}
