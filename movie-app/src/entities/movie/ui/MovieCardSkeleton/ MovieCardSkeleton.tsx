import {Skeleton} from "@/shared/ui/Skeleton";
import s from '../MovieCard/MovieCard.module.css'

export const MovieCardSkeleton = () => {
  return (
    <div className={s.wrapMovieCard}>
      <Skeleton height="270px" borderRadius="12px" margin='40px 0 0 0' />
      <Skeleton height="24px" width="90%" margin="10px 0px"/>
      <Skeleton height="20px" width="60px" />
    </div>
  )
}