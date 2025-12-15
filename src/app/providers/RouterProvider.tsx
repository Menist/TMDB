import {CategoryMoviesPage} from "../../pages/Category/ui";
import {Route, Routes, useLocation} from "react-router-dom";
import {MainPage} from "../../pages/Main/ui";
import {NotFoundPage} from "../../pages/NotFound/ui";
import {FilteredPage} from "../../pages/Filtered/ui";
import {SearchPage} from "../../pages/Search/ui";
import {FavoritesPage} from "../../pages/Favorites/ui";
import {Layouts} from "../layouts/Layouts";
import {TopRatedMovies} from "../../features/movies/ui/TopRatedMovies";
import {MovieDetailsPage} from "../../pages/MovieDetailsPage";
import {UpcomingMovies} from "../../features/movies/ui/UpcomingMovies";
import {NowPlayingMovies} from "../../features/movies/ui/NowPlayingMovies";
import {useEffect} from "react";

export const Path = {
  Main: "/",
  CategoryPopularMovies: "/movies/popular",
  FilteredMovies: "/filtered-movies",
  TopRatedMovies: "/movies/top-rated",
  UpcomingMovies: "/movies/upcoming",
  NowPlayingMovies: "/movies/now-playing",
  ToMovie: "/movie/:id",
  Search: "/search",
  Favorites: "/favorites",
  NotFoundPage: "*",
} as const

export const RouterProvider = () => {
  const location = useLocation();

  useEffect(() => {
    const key = "searchPage";
    if (location.pathname !== "/search") {
      localStorage.removeItem(key);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layouts/>}>
        <Route path={Path.Main} element={<MainPage/>}/>
        <Route path={Path.CategoryPopularMovies} element={<CategoryMoviesPage/>}/>
        <Route path={Path.FilteredMovies} element={<FilteredPage/>}/>
        <Route path={Path.TopRatedMovies} element={<TopRatedMovies/>}/>
        <Route path={Path.UpcomingMovies} element={<UpcomingMovies/>}/>
        <Route path={Path.NowPlayingMovies} element={<NowPlayingMovies/>}/>
        <Route path={Path.Search} element={<SearchPage/>}/>
        <Route path={Path.Favorites} element={<FavoritesPage/>}/>
        <Route path={Path.ToMovie} element={<MovieDetailsPage />}/>
        <Route path={Path.NotFoundPage} element={<NotFoundPage/>}/>
      </Route>
    </Routes>
  )
}
