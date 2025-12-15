import {Outlet} from "react-router-dom";
import s from './Layouts.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {changeThemeModeAC, selectThemeMode} from "../../features/theme/model/themeSlice";
import {useEffect} from "react";
import {Header} from "../../widgets/Header/ui";
import {Footer} from "../../widgets/Footer/ui";
import {useSelector} from "react-redux";
import {selectFavoriteFilms} from "../../features/movies/model/favoriteSlice";

export const Layouts = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const favoriteMovies = useSelector(selectFavoriteFilms)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const saved = localStorage.getItem("themeMode")
    if (saved && (saved === "light" || saved === "dark")) {
      dispatch(changeThemeModeAC({ themeMode: saved }))
    }
  }, [dispatch])

  useEffect(() => {
    const currentThemeClass = `theme-${themeMode}`;
    const oppositeThemeClass = themeMode === 'dark' ? 'theme-light' : 'theme-dark';

    document.body.classList.remove(oppositeThemeClass);
    document.body.classList.add(currentThemeClass);

    localStorage.setItem("themeMode", themeMode)
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies))
  }, [favoriteMovies]);

  return (
    <div className={s.layout}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
