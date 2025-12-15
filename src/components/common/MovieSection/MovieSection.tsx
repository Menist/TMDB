import {useAppDispatch, useBuildImageUrl} from "../../../common/hooks";
import {MovieCard} from "../../../features/movies/ui/MovieCard";
import {SectionHeaderBlock} from "../SectionHeaderBlock";
import {useSelector} from "react-redux";
import {selectFavoriteFilms, toggleFavorite} from "../../../features/movies/model/favoriteSlice";
import s from '../../../shared/ui/movieGrid';
import {buildPosterUrl} from "../../../common/utils";
import type {BaseMovieSchemaType} from "../../../shared/api/schemas";
import {MovieGridSkeleton} from "../../../shared/ui/skeletons/MovieGridSkeleton";

type MovieSectionProps = {
  title: string
  limit?: number
  to: string
  showViewMore?: boolean
  movies: BaseMovieSchemaType[]
  isLoading: boolean
  withHeader?: boolean
}
export const MovieSection = (
  { limit, to, title, movies, isLoading, showViewMore = true, withHeader = true }: MovieSectionProps
) => {
  const dispatch = useAppDispatch()
  const favoriteMovies = useSelector(selectFavoriteFilms)
  const url = useBuildImageUrl()
  const moviesToShow = limit ? movies.slice(0, limit) : movies;

  return (
    <>
      {withHeader && (
        <SectionHeaderBlock
          isLoading={isLoading}
          showViewMore={showViewMore}
          to={to!}
          title={title!}
          className={s.movieSection}
        />
      )}

      <section className={s.movieSection}>
        {isLoading ? (
          <>
            <MovieGridSkeleton count={6} />
          </>
        ) : (
          moviesToShow.map((movie) => {
            const onToggle = () => dispatch(toggleFavorite({ movie }))
            return (
              <MovieCard
                id={movie.id}
                isFavorite={favoriteMovies.some(f => f.id === movie.id)}
                key={movie.id}
                pathPoster={buildPosterUrl(movie, url)}
                nameFilm={movie.original_title}
                rating={movie.vote_average}
                altImg={movie.title}
                toggleFavorite={onToggle}
              />
            )
          })
        )}
      </section>
    </>
  )
}
