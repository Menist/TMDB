import s from "./SkeletonButtonLink.module.css";
import {Skeleton} from "../common/Skeleton";

export const SkeletonButtonLink = () => {
  return (
    <div className={s.skeletonButton}>
      <Skeleton variant="rectangle" width="100%" height="2.6rem" />
    </div>
  );
};
