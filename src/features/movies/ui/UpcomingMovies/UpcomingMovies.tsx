import {MovieSection} from "../../../../components/common/MovieSection";
import {Path} from "../../../../app/providers/RouterProvider";
import {useGetInfiniteUpcomingInfiniteQuery} from "../../model/moviesApi";
import {InfiniteScroll} from "../../../../common/ui/InfiniteScroll";
import s from "../../../../shared/ui/movieGrid/MovieGrid.module.css";
import {MovieGridSkeleton} from "../../../../shared/ui/skeletons/MovieGridSkeleton";

export const UpcomingMovies = () => {
  const {
    data: infinitePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, isLoading
  } = useGetInfiniteUpcomingInfiniteQuery();
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
      <MovieSection isLoading={isLoading} title='Upcoming Movies' to={Path.CategoryPopularMovies} movies={movies} showViewMore={false}/>
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </>
  )
}