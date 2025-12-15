import s from "./SectionHeaderBlock.module.css";
import {Skeleton} from "../Skeleton";

export const SectionHeaderBlockSkeleton = () => {
  return (
    <section className={s.sectionHeaderBlock}>
      <div className={s.sectionHeader}>
        <Skeleton variant="text" width="100px" height="1.2em" />
      </div>

      <div className={s.viewMoreLink}>
        <Skeleton variant="text" width="100px" height="2em" />
      </div>
    </section>
  );
};
