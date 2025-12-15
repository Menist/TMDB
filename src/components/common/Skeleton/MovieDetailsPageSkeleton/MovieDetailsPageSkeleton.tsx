import s from "../../../../pages/MovieDetailsPage/MovieDetailsPage/ui/MovieDetailsPage.module.css";
import {MovieInfoSkeleton} from "../MovieInfoSkeleton";
import {ActorsGridSkeleton} from "../ActorsGridSkeleton";
import {SimilarMoviesSkeleton} from "../SimilarMoviesSkeleton";

export const MovieDetailsPageSkeleton = () => {
  return (
    <div className="container">
      <section>
        <MovieInfoSkeleton />
      </section>

      <section className={s.movieDetailsSection}>
        <h1 className={s.movieDetailTitle}>Cast</h1>
        <ActorsGridSkeleton />
      </section>

      <h1 className={s.movieDetailTitle}>Similar Movies</h1>
      <SimilarMoviesSkeleton />
    </div>
  );
};
