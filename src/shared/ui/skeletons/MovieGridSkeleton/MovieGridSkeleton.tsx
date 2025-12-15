import s from "../../movieGrid";
import {SkeletonMovieCard} from "../../../../components/common/Skeleton/SkeletonMovieCard/SkeletonMovieCard";

type MovieGridSkeletonProps = {
  count?: number;
};

export const MovieGridSkeleton = ({ count = 6 }: MovieGridSkeletonProps) => {
  return (
    <div className={s.movieSection}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMovieCard key={i} />
      ))}
    </div>
  );
};
