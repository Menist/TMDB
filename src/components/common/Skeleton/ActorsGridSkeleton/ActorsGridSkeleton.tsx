import s from "../../../../pages/MovieDetailsPage/MovieDetailsPage/ui/MovieDetailsPage.module.css";

import {Skeleton} from "../Skeleton";

export const ActorsGridSkeleton = () => {
  return (
    <div className={s.movieDetailGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ textAlign: "center" }}>
         <p> <Skeleton variant="circle" width={160} height={160} /></p>
          <p>  <Skeleton width="80%" height={18} /></p>
          <p>  <Skeleton width="60%" height={18} /></p>
        </div>
      ))}
    </div>
  );
};
