import s from './MovieSection.module.css'
import {Link} from "react-router-dom";
import {MovieCard} from "@/entities/movie/ui";
import type {Movie} from "@/entities/movie/model/schemas";

type MovieSectionProps = {
  title?: string
  movies: Movie[]
  seeAllLink?: string
}
export const MovieSection = ({movies, seeAllLink, title}: MovieSectionProps) => {
  return (
    <section className={s.wrapMovieSection}>
      <h2>{title}</h2>
      {seeAllLink && <Link to={seeAllLink}>See All</Link>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard key={`${title}-${movie.id}`} movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}