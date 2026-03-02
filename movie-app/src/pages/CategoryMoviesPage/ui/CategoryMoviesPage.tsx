import {useLocation, useNavigate} from "react-router-dom";
import {Path} from "@/app/config/routes";
import s from './CategoryMoviesPage.module.css'
import {MovieSection} from "@/widgets/MovieSection";
import {useMovieCategories} from "@/entities/movie/lib";
import {useInfiniteScroll} from '@/shared/lib/useInfiniteScroll'
import {Button} from "@/shared/ui/Button";
import {MovieCardSkeleton} from "@/entities/movie/ui/MovieCardSkeleton";


export const CategoryMoviesPage = () => {
  const {popular, topRated, upcoming, nowPlaying} = useMovieCategories()
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname

  const categories = [
    {path: Path.Popular, label: 'Popular Movies', key: 'popular'},
    {path: Path.TopRated, label: 'Top Rated Movies', key: 'top_rated'},
    {path: Path.Upcoming, label: 'Upcoming Movies', key: 'upcoming'},
    {path: Path.NowPlaying, label: 'Now Playing Movies', key: 'now_playing'},
  ]

  const activeCategory = categories.find((el) => pathname === el.path)

  let currentCategoryData = null
  if (activeCategory) {
    switch (activeCategory.key) {
      case 'popular':
        currentCategoryData = popular
        break
      case 'top_rated':
        currentCategoryData = topRated
        break
      case 'upcoming':
        currentCategoryData = upcoming
        break
      case 'now_playing':
        currentCategoryData = nowPlaying
        break
    }
  }

  const {observerRef} = useInfiniteScroll({
    fetchNextPage: currentCategoryData?.fetchNextPage || (() => {}),
    hasNextPage: currentCategoryData?.hasNextPage || false,
    isFetching: currentCategoryData?.isFetchingNextPage || false,
  })

  if (popular.isLoading || topRated.isLoading || upcoming.isLoading || nowPlaying.isLoading) {
    return (
      <div className={s.categoryPage}>
        <h1>Loading...</h1>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={s.categoryPage}>
      <h1>{activeCategory?.label}</h1>
      <div className={s.categoryButtons}>
        {categories.map((category) => (
          <Button
            className={pathname === category.path ? s.active : ''}
            key={category.key}
            onClick={() => navigate(category.path)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {activeCategory?.key === 'popular' &&
        <MovieSection title={activeCategory.label} movies={popular.allMovies}/>}
      {activeCategory?.key === 'top_rated' &&
        <MovieSection title={activeCategory.label} movies={topRated.allMovies}/>}
      {activeCategory?.key === 'upcoming' &&
        <MovieSection title={activeCategory.label} movies={upcoming.allMovies}/>}
      {activeCategory?.key === 'now_playing' &&
        <MovieSection title={activeCategory.label} movies={nowPlaying.allMovies}/>}

      {currentCategoryData?.hasNextPage && (
        <div ref={observerRef}>
          {currentCategoryData?.isFetchingNextPage ? (
            <div>Loading more movies...</div>
          ) : (
            <div style={{height: '20px'}}/>
          )}
        </div>
      )}
    </div>
  )
}