import {useGetConfigurationQuery} from "../../features/config/api/configApi";
import {useGetPopularMoviesQuery} from "../../features/movies/model/moviesApi";
import {useEffect, useState} from "react";

export function useRandomPopularMovieBackdrop() {
  const {data: config} = useGetConfigurationQuery()
  const {data: popMuv} = useGetPopularMoviesQuery()
  const [randomIndex, setRandomIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!popMuv) return;
    setRandomIndex(Math.floor(Math.random() * popMuv.results.length))

  }, [popMuv])
  if (!config || !popMuv || popMuv.results.length === 0) return null;

  if (randomIndex === null) return null;
  return `${config.images.secure_base_url}${config.images.backdrop_sizes[2]}${popMuv.results[randomIndex].backdrop_path}`;
}
