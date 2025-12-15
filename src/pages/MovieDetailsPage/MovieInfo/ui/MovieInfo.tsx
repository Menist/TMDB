import styles from './MovieInfo.module.css';
import {formatRuntime} from "../../../../shared";
import {roundRating} from "../../../../shared";

type MovieDetailsProps = {
  posterUrl: string
  name: string
  releaseDate: string
  description: string
  runtime: number
  rating: number
  genres: string[]
}

export const MovieInfo = ({posterUrl, name, description, runtime, rating, genres, releaseDate}: MovieDetailsProps) => {
  if (!rating) return null;

  return (
    <div className={styles.container}>
      <img
        src={posterUrl ?? '/placeholder.jpg'}
        alt={`Movie ${name}`}
        className={styles.poster}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>{name}</h1>

        <div className={styles.genresSection}>
          <h2 className={styles.genresTitle}>Genres</h2>
          <ul className={styles.genresList}>
            {genres.map((genre, index) => (
              <li key={index} className={styles.genreTag}>
                {genre}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Runtime</span>
            <span className={`${styles.detailValue} ${styles.runtime}`}>
              {formatRuntime(runtime)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Rating</span>
            <span className={`${styles.detailValue} ${styles.rating}`}>
              {roundRating(rating)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Release Year</span>
            <span className={`${styles.detailValue} ${styles.releaseYear}`}>
              {releaseDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}