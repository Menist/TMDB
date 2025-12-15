import {WelcomeBlock} from "../../../widgets/WelcomeBlock";
import {MovieSection} from "../../../components/common/MovieSection";
import {
  useGetNowPlayingQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery
} from "../../../features/movies/model/moviesApi";
import {Path} from "../../../app/providers/RouterProvider";

export const MainPage = () => {
  const popular = useGetPopularMoviesQuery();
  const topRated = useGetTopRatedQuery();
  const upcoming = useGetUpcomingQuery();
  const nowPlaying = useGetNowPlayingQuery();
  return (
    <>
      <WelcomeBlock/>
      <div className="container">
        <MovieSection
          isLoading={popular.isLoading || popular.isFetching}
          title="Popular Movies"
          to={Path.CategoryPopularMovies}
          movies={popular.data?.results ?? []}
          limit={6}
        />
        <MovieSection
          isLoading={popular.isLoading || popular.isFetching}
          title="Top Rated Movies"
          to={Path.TopRatedMovies}
          movies={topRated.data?.results ?? []}
          limit={6}
        />
        <MovieSection
          isLoading={popular.isLoading || popular.isFetching}
          title="Upcoming Movies"
          to={Path.UpcomingMovies}
          movies={upcoming.data?.results ?? []}
          limit={6}
        />
        <MovieSection
          isLoading={popular.isLoading || popular.isFetching}
          title="Now Playing Movies"
          to={Path.NowPlayingMovies}
          movies={nowPlaying.data?.results ?? []}
          limit={6}
        />
      </div>
    </>
  )
}