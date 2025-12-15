import {useNavigate, useParams} from "react-router-dom";
import {useGetActorsQuery, useGetDetailsQuery, useGetSimilarQuery} from "../../../../features/movies/model/moviesApi";
import {MovieInfo} from "../../MovieInfo";
import {MovieActors} from "../../MovieActors";
import {useAppDispatch, useBuildImageUrl} from "../../../../common/hooks";
import s from "./MovieDetailsPage.module.css";
import {selectFavoriteFilms, toggleFavorite} from "../../../../features/movies/model/favoriteSlice";
import {MovieCard} from "../../../../features/movies/ui/MovieCard";
import {useSelector} from "react-redux";
import gridStyles from '../../../../shared/ui/movieGrid'
import {buildPosterUrl} from "../../../../common/utils";
import {MovieDetailsPageSkeleton} from "../../../../components/common/Skeleton/MovieDetailsPageSkeleton";
import {Button} from "../../../../shared/ui/Button";


export const MovieDetailsPage = () => {
  const favoriteIds = useSelector(selectFavoriteFilms)
  const {id} = useParams();
  const movieId = Number(id);
  const {data: details} = useGetDetailsQuery(movieId);
  const {data: actors} = useGetActorsQuery(movieId);
  const {data: similar} = useGetSimilarQuery(movieId);
  const url = useBuildImageUrl();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  if (!url || !details || !actors || !similar) {
    return <MovieDetailsPageSkeleton/>;
  }


  return (
    <div className='container'>

      <section>
        <div className={s.headerSection}>
          <h1>{details.title}</h1>
          <Button
            onClick={() => navigate(-1)}
            className={s.backButton}
          >← Back
          </Button>
        </div>

        <MovieInfo
          genres={details.genres.map(el => el.name + ' ')}
          posterUrl={`${url + details.poster_path}`}
          name={details.title}
          description={details.overview}
          rating={details.vote_average}
          releaseDate={details.release_date.split('-')[0]}
          runtime={details.runtime}
        />
      </section>
      {actors?.cast?.length > 0 && (
        <section className={s.movieDetailsSection}>
          <h1 className={s.movieDetailTitle}>Cast</h1>
          <div className={s.movieDetailGrid}>
            {actors.cast.slice(0, 6).map(el => {
              const posterUrl = el.profile_path ? `${url + el.profile_path}` : '/placeholder.jpg';
              return (
                <MovieActors
                  key={el.id}
                  posterUrl={posterUrl}
                  name={el.name}
                  character={el.character}
                />
              );
            })}
          </div>
        </section>
      )}

      {similar?.results?.length > 0 && (
        <>
          <h1 className={s.movieDetailTitle}>Similar Movies</h1>
          <section className={gridStyles.movieSection}>
            {similar.results.slice(0, 6).map((movie) => {
              const isFavorite = favoriteIds.some(fav => fav.id === movie.id);
              const handleToggle = () => dispatch(toggleFavorite({ movie }));
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  isFavorite={isFavorite}
                  pathPoster={buildPosterUrl(movie, url)}
                  nameFilm={movie.title}
                  rating={movie.vote_average}
                  altImg={movie.title}
                  toggleFavorite={handleToggle}
                />
              );
            })}
          </section>
        </>
      )}
    </div>
  )
};