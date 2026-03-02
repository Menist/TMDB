import {useNavigate} from "react-router-dom";
import s from './MovieCard.module.css'
import {getImageUrl} from "@/shared/lib/image";
import {AddToFavoritesButton} from "@/features/favorites";
import type {Movie} from "../../model/schemas";

type MovieCardProps = {
  movie: Movie
}

export const MovieCard = ({movie}: MovieCardProps) => {
  const navigate = useNavigate()
  const posterUrl = getImageUrl(movie.poster_path)

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className={s.wrapMovieCard} onClick={handleClick}>
      <div className={s.posterMovieCard}>
        {posterUrl ? (
          <img className={s.posterImgMovieCard}
               src={posterUrl} alt={movie.title}/>
        ) : (
          <div className={s.noImagePlaceholder}>No Image</div>
        )}
        <div className={s.ratingOverlay}>{movie.vote_average.toFixed(1)}</div>
      </div>
      <div className={s.nameFilmMovieCard}>{movie.title}</div>
      <AddToFavoritesButton movie={movie} className={s.favoriteButton}/>
    </div>
  )
}