import styles from "../../../../pages/MovieDetailsPage/MovieInfo/ui/MovieInfo.module.css";
import {Skeleton} from "../Skeleton";
import s from '../../../../pages/MovieDetailsPage/MovieDetailsPage/ui/MovieDetailsPage.module.css'


export const MovieInfoSkeleton = () => {
  return (
    <>
      <div className={s.headerSection}>
      <Skeleton width="30%" height={40} className={styles.genresTitle}/>
      <Skeleton width="5%" height={40} className={styles.genresTitle}/>
      </div>

      <div className={styles.container}>
        <Skeleton variant="rectangle" width={300} height={450}/>

        <div className={styles.content}>
          <Skeleton width="60%" height={40}/>

          <div className={styles.genresSection}>
            <Skeleton width="30%" height={20}/>
            <div style={{display: "flex", gap: "0.5rem", marginTop: "1rem"}}>
              <Skeleton width={60} height={28}/>
              <Skeleton width={60} height={28}/>
              <Skeleton width={60} height={28}/>
            </div>
          </div>

          <Skeleton count={1} height={150}/>

          <div className={styles.details}>
            <Skeleton width={80} height={50}/>
            <Skeleton width={80} height={50}/>
            <Skeleton width={80} height={50}/>
          </div>
        </div>
      </div>
    </>
  );

};
