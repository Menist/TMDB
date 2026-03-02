import {useGetPopularMoviesInfiniteQuery} from "@/entities/movie/api/movieApi";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {useNavigate} from "react-router-dom";
import type {FormEvent} from "react";
import {useEffect} from "react";
import {useState} from "react";
import s from './WelcomeSection.module.css'
import type {Movie} from "@/entities/movie/model/schemas";

export const WelcomeSection = () => {
  const {data} = useGetPopularMoviesInfiniteQuery()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)

  const movies = data?.pages[0]?.results

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length)
      setRandomMovie(movies[randomIndex])
    }
  }, [])

  if (!randomMovie) return null

  const backdropUrl = randomMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
    : undefined

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/search?q=${searchQuery}`)
  }
  return (
    <div
      className={s.welcomeSection}
      style={{backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined}}
    >
      <div className={s.welcomeSectionTextWrap}>
        <h1>Welcome</h1>
        <p>Browse highlighted titles from TMDB</p>
        <form className={s.searchForm} onSubmit={handleSubmit} aria-label="Поиск фильмов">
          <Input
            type='search'
            placeholder='Поиск фильмов...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Поисковый запрос"
          />
          <Button aria-label="Найти фильмы" disabled={searchQuery.trim() === ''}>Search</Button>
        </form>
      </div>
    </div>
  )
}
