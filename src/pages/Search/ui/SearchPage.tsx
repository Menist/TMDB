import s from './SearchPage.module.css';
import buttonStyles from '../../../shared/ui/Button/Button.module.css';
import inputStyles from '../../../shared/ui/Input/Input.module.css';
import type {ChangeEvent, FormEvent} from "react";
import {useEffect, useState} from "react";
import {useGetInfiniteSearchMovieInfiniteQuery} from "../../../features/movies/model/moviesApi";
import {MovieCard} from "../../../features/movies/ui/MovieCard";
import {useSelector} from "react-redux";
import {selectFavoriteFilms, toggleFavorite} from "../../../features/movies/model/favoriteSlice";
import {useAppDispatch, useBuildImageUrl} from "../../../common/hooks";
import {buildPosterUrl} from "../../../common/utils";
import {useSearchParams} from "react-router-dom";
import {MovieGridSkeleton} from "../../../shared/ui/skeletons/MovieGridSkeleton";

export const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const [inputValue, setInputValue] = useState(queryParam);
  const [searchText, setSearchText] = useState(queryParam);
  const [message, setMessage] = useState('Увядзіце назву фільма');

  const favoriteIds = useSelector(selectFavoriteFilms);
  const dispatch = useAppDispatch();
  const url = useBuildImageUrl();

  const {
    data: infinitePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetInfiniteSearchMovieInfiniteQuery(
    {searchText},
    {skip: searchText.trim() === ''}
  );


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(inputValue);
    setSearchParams({query: inputValue});
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '') {
      setSearchText('');
      setMessage('Увядзіце назву фільма');
      localStorage.removeItem('searchPage');
    }
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setMessage('Увядзіце назву фільма');
      return;
    }

    if (searchText !== '' && infinitePages?.pages?.[0]?.results?.length === 0) {
      setMessage(`Няма вынікаў для "${searchText}"`);
      return;
    }

    setMessage('');
  }, [inputValue, searchText, infinitePages]);


  useEffect(() => {
    if (queryParam.trim() !== "") {
      setInputValue(queryParam);
      setSearchText(queryParam);
      return;
    }

    const saved = localStorage.getItem("searchPage");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    setSearchText(parsed.searchText);
    setInputValue(parsed.searchText);
  }, [queryParam]);


  useEffect(() => {
    if (!searchText.trim()) return;

    localStorage.setItem(
      "searchPage",
      JSON.stringify({searchText})
    );
  }, [searchText]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      const scrolled = window.innerHeight + window.scrollY;
      const fullHeight = document.body.offsetHeight;

      if (scrolled >= fullHeight - 300) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


  const movies = searchText.trim()
    ? infinitePages?.pages.flatMap((page) => page.results) ?? []
    : [];
  return (
    <section className={s.container}>

      <h1 className={s.title}>Search Results</h1>

      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={inputStyles.input}
          placeholder="Пошук фільма"
          type="search"
          value={inputValue}
          autoComplete="off"
          onChange={handleInput}
        />
        <button
          disabled={inputValue.trim().length === 0}
          className={buttonStyles.button}
          type="submit"
        >
          Search
        </button>
      </form>

      <p className={s.message}>{message}</p>

      <div className={s.searchGrid}>

        {isLoading && (<MovieGridSkeleton count={12}/>)}
        {!isLoading &&
          movies.map((el) => {
            const onToggle = () => dispatch(toggleFavorite({movie: el}));

            return (
              <MovieCard
                key={el.id}
                id={el.id}
                isFavorite={favoriteIds.some((fav) => fav.id === el.id)}
                pathPoster={buildPosterUrl(el, url)}
                nameFilm={el.title}
                rating={el.vote_average}
                altImg={el.title}
                toggleFavorite={onToggle}
              />
            );
          })
        }

        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  )

};
