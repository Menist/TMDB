import {MovieSection} from "../../../../components/common/MovieSection";
import {Path} from "../../../../app/providers/RouterProvider";
import {InfiniteScroll} from "../../../../common/ui/InfiniteScroll";
import {useGetInfinitePopularMoviesInfiniteQuery} from "../../model/moviesApi";
import s from "../../../../shared/ui/movieGrid/MovieGrid.module.css";
import {MovieGridSkeleton} from "../../../../shared/ui/skeletons/MovieGridSkeleton";


export const PopularMovies = () => {
  const {
    data: infinitePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, isLoading
  } = useGetInfinitePopularMoviesInfiniteQuery();
  const movies = infinitePages?.pages.flatMap(page => page.results) ?? [];
  if (isLoading) {
    return (
      <div className="container">
        <div className={s.movieSection}>
          <MovieGridSkeleton count={12} />
        </div>
      </div>
    );
  }

  return (
    <>
    <MovieSection
       isLoading={isLoading}
      movies={movies}
      showViewMore={false}
      title='Popular Movies' to={Path.CategoryPopularMovies}
    />
  <InfiniteScroll
    hasNextPage={hasNextPage}
    isFetchingNextPage={isFetchingNextPage}
    onLoadMore={fetchNextPage}
  />
    </>
  )
}