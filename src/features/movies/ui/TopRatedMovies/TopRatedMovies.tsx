import {Path} from "../../../../app/providers/RouterProvider";
import {MovieSection} from "../../../../components/common/MovieSection";
import {useGetTopRatedMoviesInfiniteQuery} from "../../model/moviesApi";
import {InfiniteScroll} from "../../../../common/ui/InfiniteScroll";
import s from '../../../../shared/ui/movieGrid/MovieGrid.module.css';
import {MovieGridSkeleton} from "../../../../shared/ui/skeletons/MovieGridSkeleton";


export const TopRatedMovies = () => {
  const {
    data: infinitePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, isLoading
  } = useGetTopRatedMoviesInfiniteQuery();

  const movies = infinitePages?.pages.flatMap(page => page.results) ?? [];
  // const FORCE_LOADING = true;
  //
  // if (FORCE_LOADING) {
  //   return (
  //       <div className={s.movieSection}>
  //         {[...Array(12)].map((_, i) => (
  //           <SkeletonMovieCard key={i} />
  //         ))}
  //       </div>
  //   );
  // }

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
        title="Top Rated Movies"
        to={Path.TopRatedMovies}
      />

      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </>
  );
};
