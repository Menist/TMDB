import {useEffect, useState} from "react";
import {useDiscoverInfiniteQuery, useGetGenresQuery} from "@/entities/movie/api/movieApi";
import {Button} from "@/shared/ui/Button";
import type {DiscoverParams} from "@/entities/movie/model/types";
import {useInfiniteScroll} from "@/shared/lib/useInfiniteScroll";
import s from './FilteredMoviesPage.module.css'
import {useDebounce} from '@/shared/lib/useDebounce'
import {MovieCard} from "@/entities/movie/ui";
import {MovieCardSkeleton} from "@/entities/movie/ui/MovieCardSkeleton";
import {useGetPopularMoviesInfiniteQuery} from "@/entities/movie/api/movieApi";

export const FilterPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number>(0)
  const [maxRating, setMaxRating] = useState<number>(10)
  const [appliedFilters, setAppliedFilters] = useState<DiscoverParams>({})
  const [hasSearched, setHasSearched] = useState(false)
  const [sortBy, setSortBy] = useState<string>('popularity.desc')
  const [filterKey, setFilterKey] = useState(0)

  const debouncedMinRating = useDebounce(minRating, 200)
  const debouncedMaxRating = useDebounce(maxRating, 200)
  const {data: genresData} = useGetGenresQuery()

  const {
    data: filteredData,
    fetchNextPage: fetchNextFiltered,
    hasNextPage: hasNextFiltered,
    isFetchingNextPage: isFetchingNextFiltered,
    isFetching: isFetchingFiltered
  } = useDiscoverInfiniteQuery(
    {...appliedFilters, _key: filterKey},
    {skip: !hasSearched}
  )

  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingNextPopular,
    isFetching: isFetchingPopular
  } = useGetPopularMoviesInfiniteQuery()

  const activeData = hasSearched ? filteredData : popularData
  const activeFetchNext = hasSearched ? fetchNextFiltered : fetchNextPopular
  const activeHasNext = hasSearched ? hasNextFiltered : hasNextPopular
  const activeIsFetchingNext = hasSearched ? isFetchingNextFiltered : isFetchingNextPopular
  const activeIsFetching = hasSearched ? isFetchingFiltered : isFetchingPopular

  const allMoviesRaw = activeData?.pages.flatMap(page => page.results) || []
  const allMovies = allMoviesRaw.filter((movie, index, self) =>
    index === self.findIndex(m => m.id === movie.id)
  )
  const {observerRef} = useInfiniteScroll({
    fetchNextPage: activeFetchNext,
    hasNextPage: activeHasNext || false,
    isFetching: activeIsFetchingNext || false,
  })

  const sortOptions = [
    {value: 'popularity.desc', label: 'По популярности (убывание)'},
    {value: 'popularity.asc', label: 'По популярности (возрастание)'},
    {value: 'vote_average.desc', label: 'По рейтингу (убывание)'},
    {value: 'vote_average.asc', label: 'По рейтингу (возрастание)'},
    {value: 'primary_release_date.desc', label: 'По дате выпуска (убывание)'},
    {value: 'primary_release_date.asc', label: 'По дате выпуска (возрастание)'},
    {value: 'title.asc', label: 'По названию (А-Я)'},
    {value: 'title.desc', label: 'По названию (Я-А)'},
  ]

  const buildFilters = (): DiscoverParams => {
    const filters: DiscoverParams = {}

    if (selectedGenres.length > 0) {
      filters.with_genres = selectedGenres.join(',')
    }
    if (selectedYear) {
      filters.primary_release_year = selectedYear
    }
    if (sortBy) {
      filters.sort_by = sortBy
    }
    if (debouncedMinRating > 0) filters['vote_average.gte'] = debouncedMinRating
    if (debouncedMaxRating < 10) filters['vote_average.lte'] = debouncedMaxRating

    return filters
  }

  useEffect(() => {
    if (hasSearched) {
      const filters = buildFilters()
      setAppliedFilters(filters)
      setFilterKey(prev => prev + 1)
    }
  }, [debouncedMinRating, debouncedMaxRating, selectedGenres, selectedYear, sortBy])

  const handleGenreToggle = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId))
    } else {
      setSelectedGenres([...selectedGenres, genreId])
    }
  }

  const handleSearch = () => {
    const filters = buildFilters()
    setAppliedFilters(filters)
    setHasSearched(true)
    setFilterKey(prev => prev + 1)
  }

  const handleReset = () => {
    setSelectedGenres([])
    setSelectedYear(null)
    setMinRating(0)
    setMaxRating(10)
    setSortBy('popularity.desc')
    setAppliedFilters({})
    setHasSearched(false)
  }
  return (
    <div className={s.filterPage}>
      <div className={s.filtersSection}>
        <div className={s.filterGroup}>
          <label>Сортировка:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.genresGrid}>
          {genresData?.genres.map((genre) => (
            <label key={genre.id} className={s.genreLabel}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreToggle(genre.id)}
              />
              {genre.name}
            </label>
          ))}
        </div>

        <div className={s.ratingSection}>
          <div className={s.ratingHeader}>
            <span>Рейтинг</span>
            <span>{minRating.toFixed(1)} - {maxRating.toFixed(1)}</span>
          </div>
          <div className={s.ratingInputs}>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={s.filterGroup}>
          <label>Год выпуска:</label>
          <input
            type="number"
            placeholder="2023"
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
          />
        </div>

        <div style={{display: 'flex', gap: '12px'}}>
          <Button onClick={handleSearch}>Применить фильтры</Button>
          <Button variant="secondary" onClick={handleReset}>Сбросить</Button>
        </div>
      </div>


        <>
          <h1>{hasSearched ? 'Filtered Movies' : 'Popular Movies'}</h1>
          {activeIsFetching && !activeIsFetchingNext && (
            <div className={s.moviesList}>
              {Array.from({length: 10}).map((_, i) => (
                <MovieCardSkeleton key={i}/>
              ))}
            </div>
          )}

          {allMovies.length === 0 && !activeIsFetching ? (
            <p className={s.emptyMessage}>Ничего не найдено</p>
          ) : (
            <ul className={s.moviesList}>
              {allMovies.map((movie) => (
                <li key={movie.id}>
                  <MovieCard movie={movie}/>
                </li>
              ))}
            </ul>
          )}
        </>

      {activeIsFetchingNext && <div className={s.loadingMore}>Загрузка...</div>}
      {activeHasNext && <div ref={observerRef}/>}
    </div>
  )
}