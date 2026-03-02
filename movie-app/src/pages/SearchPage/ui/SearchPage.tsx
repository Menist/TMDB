import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useSearchMoviesInfiniteQuery} from "@/entities/movie/api/movieApi";
import {useInfiniteScroll} from "@/shared/lib/useInfiniteScroll";
import {Input} from "@/shared/ui/Input";
import {useSearchParams} from "react-router-dom";
import {MovieCard} from "@/entities/movie/ui";
import s from './SearchPage.module.css'
import {MovieCardSkeleton} from "@/entities/movie/ui/MovieCardSkeleton";

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching
  } = useSearchMoviesInfiniteQuery(q, {skip: q.trim() === ''})

  const allMovies = data?.pages.flatMap(page => page.results) || []
  let message = ''
  if (!q) {
    message = 'Введите название фильма и нажмите поиск'
  } else if (allMovies.length === 0) {
    message = `По запросу "${q}" ничего не найдено`
  }

  const {observerRef} = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetching: isFetchingNextPage || false,
  })
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchParams({q: inputValue})
    localStorage.setItem('lastSearch', inputValue)
  }
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    if (!e.currentTarget.value) {
      setSearchParams({q: ''})
    }
  }

  useEffect(() => {
    if (q !== null) {
      setInputValue(q)
    } else {
      setInputValue(localStorage.getItem('lastSearch') || '')
    }
  }, []);
  return (
    <div className={s.searchPage}>
      <form className={s.searchForm} onSubmit={submitHandler}>
        <div className={s.searchInput}>
          <Input
            placeholder='Введите название фильма'
            value={inputValue}
            onChange={inputHandler}
            type='search'
            aria-label='Название фильма для поиска'
          />
        </div>
        <Button className={s.searchButton} disabled={inputValue.trim() === ''}>
          Поиск
        </Button>
      </form>

      {q.trim() !== '' && isFetching && !isFetchingNextPage ? (
        <div className={s.moviesList}>
          {Array.from({length: 10}).map((_, i) => (
            <MovieCardSkeleton key={i}/>
          ))}
        </div>
      ) : q.trim() !== '' && allMovies.length === 0 ? (
        <div className={s.message}>По запросу "{q}" ничего не найдено</div>
      ) : q.trim() !== '' ? (
        <ul className={s.moviesList}>
          {allMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie}/>
            </li>
          ))}
        </ul>
      ) : (
        <div className={s.message}>{message}</div>
      )}

      {isFetchingNextPage && <div className={s.loadingMore}>Загрузка...</div>}

      <div ref={observerRef}/>
    </div>
  )
}
