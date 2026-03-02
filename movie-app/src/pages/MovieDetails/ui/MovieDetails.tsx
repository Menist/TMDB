import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery
} from "@/entities/movie/api/movieApi";
import {useNavigate, useParams} from "react-router-dom";
import s from './MovieDetails.module.css'
import {getImageUrl} from "@/shared/lib/image";
import {AddToFavoritesButton} from "@/features/favorites";
import {formatRuntime} from "@/shared/lib/formatTime";
import {MovieCard} from "@/entities/movie/ui";
import {Button} from "@/shared/ui/Button";
import type {Movie} from "@/entities/movie/model/schemas";

export const MovieDetails = () => {
  const {id} = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {data: movieDetails, isLoading: isLoadingDetails} = useGetMovieDetailsQuery(Number(id))
  const {data: credits, isLoading: isLoadingCredits} = useGetMovieCreditsQuery(Number(id))
  const {data: similar, isLoading: isLoadingSimilar} = useGetSimilarMoviesQuery(Number(id))

  if (isLoadingDetails || isLoadingCredits || isLoadingSimilar) {
    return <div>Loading...</div>
  }

  if (!movieDetails) return null

  const formattedRuntime = formatRuntime(movieDetails.runtime)

  const posterUrl = getImageUrl(movieDetails.poster_path)


  const movieForFavorites: Movie = {
    id: movieDetails.id,
    title: movieDetails.title,
    poster_path: movieDetails.poster_path || '',
    vote_average: movieDetails.vote_average,
    backdrop_path: movieDetails.backdrop_path,
    overview: movieDetails.overview,
    release_date: movieDetails.release_date,
  }
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={s.detailsPage}>
      <Button className={s.prevBtn} variant="secondary" onClick={handleGoBack}>Назад</Button>
      <div className={s.mainInfo}>
        <div className={s.poster}>
          {posterUrl && <img src={posterUrl} alt={movieDetails.title}/>}
          <AddToFavoritesButton movie={movieForFavorites} className={s.favoriteButton}/>
        </div>

        <div className={s.info}>
          <h1>{movieDetails.title}</h1>
          {movieDetails.tagline && <p className={s.tagline}>{movieDetails.tagline}</p>}

          <div className={s.genres}>
            {movieDetails.genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>

          <div className={s.meta}>
            <p>{movieDetails.vote_average.toFixed(1)}</p>
            <p>{formattedRuntime}</p>
          </div>
          <p className={s.overview}>{movieDetails.overview}</p>
        </div>
      </div>
      {credits && credits.cast.length > 0 && (
        <div className={s.actors}>
          <h2>Актёры</h2>
          {credits && credits.cast.length > 0 && (
            <div className={s.castList}>
              {credits.cast.slice(0, 5).map((actor) => (
                <div key={actor.id} className={s.actorCard}>
                    {actor.profile_path ? (
                      <img
                        src={getImageUrl(actor.profile_path, 'w185') ?? undefined}
                        alt={actor.name}
                      />
                    ) : (
                      <div className={s.actorPlaceholder}>👤</div>
                    )}
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {similar && similar.results.length > 0 && (
        <div className={s.similarMovies}>
          <h2>Похожие фильмы</h2>
          {similar && similar.results.length > 0 && (
            <ul className={s.castList}>
              {similar.results.slice(0, 5).map((movie) => (
                <li key={movie.id}>
                  <MovieCard movie={movie}/>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}