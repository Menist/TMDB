import s from './MovieCard.module.css'
import {Link} from "react-router-dom";
import {roundRating} from "../../../../shared";

type MovieCardProps = {
  pathPoster: string
  nameFilm: string
  rating: number
  altImg: string
  isFavorite: boolean
  toggleFavorite: () => void
  id: number
}

export const MovieCard = ({nameFilm, pathPoster, rating, altImg, isFavorite, toggleFavorite, id}: MovieCardProps) => {


  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite()
  };

  return (
    <Link to={`/movie/${id}`}>
      <article className={s.article}>
        <img
          src={pathPoster}
          alt={altImg}
          className={s.image}
        />
        <h2 className={s.title}>{nameFilm}</h2>
        <button
          className={`${s.favoriteBtn} ${isFavorite ? s.active : ''}`}
          onClick={handleFavoriteClick}>♥
        </button>
        <p className={s.rating}>{roundRating(rating)}</p>
      </article>
    </Link>
  );
};