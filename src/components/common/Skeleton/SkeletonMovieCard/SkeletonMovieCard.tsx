import s from "../../../../features/movies/ui/MovieCard/MovieCard.module.css";
import st from "../Skeleton.module.css";
import {Skeleton} from "../Skeleton";

export const SkeletonMovieCard = () => {
  return (
    <>
      <article className={s.article}>
        <Skeleton variant="rectangle" className={s.image}/>

        <button className={s.favoriteBtn}>
          <Skeleton variant="circle" width={27} height={27}/>
        </button>

        <div className={st.ratingSkeleton}>
          <Skeleton variant="circle" width={20} height={20}/>
        </div>

        <h2 className={s.title}>
          <Skeleton className={st.title} variant="text" width="70%" height="1em"/>
        </h2>
      </article>
    </>
  );
};
