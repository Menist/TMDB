import type {RootState} from "@/app/store/store";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@/shared/ui/Button";
import {addToFavorites, removeFromFavorites} from "../model/favoritesSlice";
import type {Movie} from "@/entities/movie/model/schemas";
import s from './AddToFavoritesButton.module.css'

type AddToFavoritesButtonProps = {
  movie: Movie
  className?: string
}
export const AddToFavoritesButton = ({movie, className}: AddToFavoritesButtonProps) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.movies)

  const isFavorite = favorites.some(f => f.id === movie.id)
  const handleClick=(e: React.MouseEvent)=>{
    e.stopPropagation()
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id))
    } else {
      dispatch(addToFavorites(movie))
    }
  }

  return (
    <Button
      className={`${className} ${s.noBorderButton}`}
      variant={isFavorite ? "primary" : "secondary"}
      onClick={handleClick}
      aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      <svg
        className={s.favoriteIconSvg}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </Button>
  )
}