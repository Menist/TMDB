import {Header} from '@/widgets/Header'
import {Footer} from '@/widgets/Footer'
import {Routing} from '@/app/config/routes'
import {NavigationLoader} from "../widgets/NavigationLoader";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import type {RootState} from "./store/store";
import s from './App.module.css';

export const App = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies)
  const theme = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('theme', theme.themeMode)
  }, [theme])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme.themeMode)
  }, [theme])

  return (
    <>
      <NavigationLoader/>
      <Header/>
      <div className={s.appContainer}>
        <main className={s.mainContent}>
          <Routing/>
        </main>
      </div>
      <Footer/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.themeMode}
        aria-label='Notifications'
      />
    </>
  )
}