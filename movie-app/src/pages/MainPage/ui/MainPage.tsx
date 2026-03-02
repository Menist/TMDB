import s from './MainPage.module.css'
import {MovieSection} from "@/widgets/MovieSection";
import {Path} from '@/app/config/routes'
import {useMovieCategories} from "@/entities/movie/lib";
import {MovieCardSkeleton} from "@/entities/movie/ui/MovieCardSkeleton";
import {WelcomeSection} from "@/widgets/WelcomeSection";

export const MainPage = () => {
  const {popular, topRated, upcoming, nowPlaying} = useMovieCategories()



  const categories = [popular, topRated, upcoming, nowPlaying]
  const isLoading = categories.some(cat => cat.isLoading)

  const sections = [
    { title: 'Popular Movies', data: popular, link: Path.Popular },
    { title: 'Top Rated Movies', data: topRated, link: Path.TopRated },
    { title: 'Upcoming Movies', data: upcoming, link: Path.Upcoming },
    { title: 'Now Playing Movies', data: nowPlaying, link: Path.NowPlaying },
  ]

  if (isLoading) {
    return (
      <div className={s.movieList}>
        {sections.map(({ title }) => (
          <div key={title}>
            <h2>{title}</h2>
            <div className={s.movieGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
    <div className={s.movieList}>
      <WelcomeSection/>
      {sections.map(({ title, data, link }) => (
          <MovieSection
            key={title}
            title={title}
            movies={data.allMovies.slice(0, 6)}
            seeAllLink={link}
          />
      ))}
    </div>
    </>
  )
}