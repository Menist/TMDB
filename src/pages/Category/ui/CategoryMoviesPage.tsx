import {useSearchParams} from "react-router-dom";
import {ButtonLink} from "../../../components/ButtonLink";
import {PopularMovies} from "../../../features/movies/ui/PopularMovies";
import {TopRatedMovies} from "../../../features/movies/ui/TopRatedMovies";
import {UpcomingMovies} from "../../../features/movies/ui/UpcomingMovies";
import {NowPlayingMovies} from "../../../features/movies/ui/NowPlayingMovies";
import s from "./CategoryMoviesPage.module.css";

export const CategoryMoviesPage = () => {
  const [searchParams] = useSearchParams();

  const value = searchParams.get('category') || 'popular'
  const currentCategory = searchParams.get('category') || 'popular';

  const categories = [
    {type: 'popular', label: 'Popular Movies'},
    {type: 'top_rated', label: 'Top Rated Movies'},
    {type: 'upcoming', label: 'Upcoming Movies'},
    {type: 'now_playing', label: 'Now Playing Movies'},
  ];

  return (
    <section className="container">
      <ul className={s.ul}>
        {categories.map(el => (
          <li key={el.type}>
            <ButtonLink
              to={`?category=${el.type}`}
              isActive={currentCategory === el.type}
            >
              {el.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
      {value === 'popular' && <PopularMovies/>}
      {value === 'top_rated' && <TopRatedMovies/>}
      {value === 'upcoming' && <UpcomingMovies/>}
      {value === 'now_playing' && <NowPlayingMovies/>}
    </section>
  )
}