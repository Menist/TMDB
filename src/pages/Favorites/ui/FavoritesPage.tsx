import { useSelector } from "react-redux";
import { selectFavoriteFilms, toggleFavorite } from "../../../features/movies/model/favoriteSlice";
import { useAppDispatch, useBuildImageUrl } from "../../../common/hooks";
import { MovieCard } from "../../../features/movies/ui/MovieCard";
import s from './FavoritesPage.module.css';
import {buildPosterUrl} from "../../../common/utils";

export const FavoritesPage = () => {
  const favoriteMovies = useSelector(selectFavoriteFilms)
  const url = useBuildImageUrl()
  const dispatch = useAppDispatch()

  return (
    <div className="container">
      <h1>Favorite Movies</h1>
      {!favoriteMovies.length && 'Дадайце фільмы ў абранае, каб убачыць іх на гэтай старонцы.'}
      <section className={s.favoriteSection}>
        {favoriteMovies.map((el) => {
          const onToggle = () => dispatch(toggleFavorite({ movie: el }))
          return (
            <MovieCard
              isFavorite={true}
              id={el.id}
              key={el.id}
              pathPoster={buildPosterUrl(el, url)}
              nameFilm={el.original_title}
              rating={el.vote_average}
              altImg={el.title}
              toggleFavorite={onToggle}
            />
          )
        })}
      </section>
    </div>
  )
}