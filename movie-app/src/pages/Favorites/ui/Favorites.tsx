import {useSelector} from "react-redux"
import {type RootState} from "@/app/store/store"
import {MovieCard} from "@/entities/movie/ui"
import s from './FavoritesPage.module.css'

export const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies)

  return (
    <div className={s.favoritesPage}>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul className={s.moviesList}>
          {favorites.map((el) => (
            <li key={el.id}>
              <MovieCard movie={el}/>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.emptyMessage}>
          Нет избранных фильмов. Добавьте фильмы, нажав на ♥
        </p>
      )}
    </div>
  )
}