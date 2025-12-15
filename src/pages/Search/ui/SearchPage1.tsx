// import s from './SearchPage.module.css';
// import {ChangeEvent, FormEvent, useRef} from "react";
// import {useEffect, useState} from "react";
// import {useGetInfiniteSearchMovieInfiniteQuery, useGetSearchMovieQuery} from "../../../features/movies/model/moviesApi";
// import {MovieCard} from "../../../features/movies/ui/MovieCard";
// import {useSelector} from "react-redux";
// import {selectFavoriteFilms, toggleFavorite} from "../../../features/movies/model/favoriteSlice";
// import {useAppDispatch, useBuildImageUrl} from "../../../common/hooks";
// import {buildPosterUrl} from "../../../common/utils/pickImagePath";
//
//
// export const SearchPage = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [searchText, setSearchText] = useState('');
//     const [message, setMessage] = useState('Enter a movie title');
//     const favoriteIds = useSelector(selectFavoriteFilms)
//     const url = useBuildImageUrl();
//     const dispatch = useAppDispatch();
//     const {
//       data: infinitePages,
//       fetchNextPage,
//       hasNextPage,
//       isFetchingNextPage
//     } = useGetInfiniteSearchMovieInfiniteQuery({searchText})
//     const {data} = useGetSearchMovieQuery(searchText, {
//       skip: searchText === '',
//     });
//
//     // useEffect(() => {
//     //   const timer = setTimeout(() => {
//     //     setSearchText(inputValue)
//     //   }, 1500);
//     //   return () => clearTimeout(timer);
//     // }, [inputValue]);
//
//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setSearchText(inputValue)
//     };
//
//     useEffect(() => {
//       if (inputValue === '') {
//         setMessage('Enter a movie title');
//       } else if (searchText !== '' && data?.results?.length === 0) {
//         setMessage(`No results found for "${searchText}"`);
//       } else {
//         setMessage('');
//       }
//     }, [inputValue, searchText, data]);
//
//     useEffect(() => {
//       const saved = localStorage.getItem("searchPage");
//       if (!saved) return;
//
//       const parsed = JSON.parse(saved);
//       setSearchText(parsed.searchText);
//       setInputValue(parsed.searchText);
//     }, []);
//
//     useEffect(() => {
//       if (searchText.trim() === '') return;
//
//       localStorage.setItem(
//         "searchPage",
//         JSON.stringify({searchText})
//       );
//     }, [searchText]);
//   const movies =
//     infinitePages?.pages.flatMap((p) => p.results) ?? [];
//
//     const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;
//       setInputValue(value);
//
//       if (value === '') {
//         setSearchText('');
//         setMessage('Enter a movie title');
//         localStorage.removeItem('searchPage');
//       }
//     };
//     const scrollRef = useRef(null);
//
//     const handleScroll = () => {
//       const el = scrollRef.current;
//       if (!el || !hasNextPage || isFetchingNextPage) return;
//
//       const {scrollTop, clientHeight, scrollHeight} = el;
//
//       if (scrollTop + clientHeight >= scrollHeight - 200) {
//         fetchNextPage();
//       }
//     };
//
//
//     return (
//       <section className={s.container}>
//
//
//         {isFetchingNextPage && <p>Loading…</p>}
//         <h1 className={s.title}>Search Results</h1>
//         <form onSubmit={handleSubmit} className={s.form}>
//           <input
//             className={s.input}
//             placeholder="Search for a movie"
//             type="search"
//             id="movie-search"
//             name="search"
//             autoComplete="off"
//             value={inputValue}
//             onChange={handleInput}
//           />
//           <button disabled={inputValue.trim().length === 0} className={s.button} type="submit">
//             Search
//           </button>
//         </form>
//         <p className={s.message}>{message}</p>
//         <div     ref={scrollRef}
//                  onScroll={handleScroll}
//                  className={s.searchGrid}>
//           {const movies = data?.pages.flatMap(page => page.results) ?? [];
//           {movies.map(movie => (
//             <MovieCard key={movie.id} movie={movie} />
//         ))}
//
//         {isFetchingNextPage && <p>Loading…</p>}
//           }
//
//           {searchText !== '' && data?.results.map((el) => {
//             const onToggle = () => dispatch(toggleFavorite({movie: el}))
//             return (
//               <MovieCard
//                 id={el.id}
//                 isFavorite={favoriteIds.some(fav => fav.id === el.id)}
//                 key={el.id}
//                 pathPoster={buildPosterUrl(el, url)}
//                 nameFilm={el.title}
//                 rating={el.vote_average}
//                 altImg={el.title}
//                 toggleFavorite={onToggle}
//               />
//             );
//           })}
//         </div>
//       </section>
//     );
//   }
// ;