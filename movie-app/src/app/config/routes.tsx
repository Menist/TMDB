import {Route, Routes} from "react-router-dom";
import {MainPage} from "@/pages/MainPage/ui";
import {CategoryMoviesPage} from "@/pages/CategoryMoviesPage/ui";
import {FilterPage} from "@/pages/FilterPage/ui";
import {SearchPage} from "@/pages/SearchPage/ui";
import {Favorites} from "@/pages/Favorites/ui";
import {MovieDetails} from "@/pages/MovieDetails/ui";
import {PageNotFound} from "@/pages/PageNotFound/ui";


export const Path = {
  Main: "/",
  Popular: "/movies/popular",
  TopRated: "/movies/top-rated",
  Upcoming: "/movies/upcoming",
  NowPlaying: "/movies/now-playing",
  Filter: "/filtered-movies",
  Search: "/search",
  Favorites: "/favorites",
  MovieDetails: "/movie/:id",
  NotFound: "*",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage/>}/>
    <Route path={Path.Popular} element={<CategoryMoviesPage/>}/>
    <Route path={Path.TopRated} element={<CategoryMoviesPage/>}/>
    <Route path={Path.Upcoming} element={<CategoryMoviesPage/>}/>
    <Route path={Path.NowPlaying} element={<CategoryMoviesPage/>}/>
    <Route path={Path.Filter} element={<FilterPage/>}/>
    <Route path={Path.Search} element={<SearchPage/>}/>
    <Route path={Path.Favorites} element={<Favorites/>}/>
    <Route path={Path.MovieDetails} element={<MovieDetails/>}/>
    <Route path={Path.NotFound} element={<PageNotFound/>}/>
    <Route path="*" element={<PageNotFound />} />
  </Routes>
)
