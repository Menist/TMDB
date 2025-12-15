import {useEffect, useState} from "react";
import {useGetInfiniteSortMoviesInfiniteQuery} from "../../../features/movies/model/moviesApi";
import {MovieSection} from "../../../components/common/MovieSection";
import {Path} from "../../../app/providers/RouterProvider";
import {InfiniteScroll} from "../../../common/ui/InfiniteScroll";
import {Button} from "../../../shared/ui/Button";
import buttonStyles from "../../../shared/ui/Button/Button.module.css";
import styles from './FilteredPage.module.css'
import s from "../../../shared/ui/movieGrid";
import {MovieGridSkeleton} from "../../../shared/ui/skeletons/MovieGridSkeleton";

export const FilteredPage = () => {
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [rating, setRating] = useState({min: 0, max: 10});
  const [debouncedRating, setDebouncedRating] = useState(rating);


  useEffect(() => {
    const handler = setTimeout(() => setDebouncedRating(rating), 200);
    return () => clearTimeout(handler);
  }, [rating]);

  const {
    data: infinitePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetInfiniteSortMoviesInfiniteQuery({sortBy, rating: debouncedRating});
  const firstLoading = isLoading && !infinitePages;

  const movies = infinitePages?.pages.flatMap(page => page.results) ?? [];

  const resetHandler = () => {
    setSortBy('popularity.desc');
    setRating({min: 0, max: 10});
    setDebouncedRating({min: 0, max: 10});
  };
  return (
    <section className='container'>
      <div className={styles.filtersRow}>
        <div className={styles.filterGroupCompact}>
          <label htmlFor="sort-select">Сартаванне</label>
          <select
            id="sort-select"
            className={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='popularity.desc'>Па папулярнасці↓</option>
            <option value='popularity.asc'>Па папулярнасці ↑</option>
            <option value='vote_average.desc'>Па рэйтынгу ↓</option>
            <option value='vote_average.asc'>Па рэйтынгу ↑</option>
            <option value='primary_release_date.asc'>Па даце выпуску ↑</option>
            <option value='primary_release_date.desc'>Па даце выпуску ↓</option>
            <option value='title.asc'>Па назве (А-Я)</option>
            <option value='title.desc'>Па назве (Я-А)</option>
          </select>
        </div>

        <div className={styles.filterGroupCompact}>
          <label className={styles.label}>
            Рэйтынг:
            <span className={styles.ratingValue}>
      {rating.min.toFixed(1)} - {rating.max.toFixed(1)}
    </span>
          </label>

          <div className={styles.doubleSlider}>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={rating.min}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRating((prev) => ({
                  ...prev,
                  min: Math.min(v, prev.max - 0.1)
                }));
              }}
              className={`${styles.rangeInput} ${styles.thumbLeft}`}
            />

            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={rating.max}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRating((prev) => ({
                  ...prev,
                  max: Math.max(v, prev.min + 0.1)
                }));
              }}
              className={`${styles.rangeInput} ${styles.thumbRight}`}
            />

            <div className={styles.sliderTrack}></div>

            <div
              className={styles.sliderRange}
              style={{
                left: `${(rating.min / 10) * 100}%`,
                right: `${100 - (rating.max / 10) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <Button
          className={buttonStyles.button}
          onClick={resetHandler}
          type='reset'
        >
          Скінуць
        </Button>
      </div>
      {firstLoading ? (
        <div className={s.movieSection}>
          <MovieGridSkeleton count={12} />
        </div>
      ) : (
        <MovieSection
          movies={movies}
          isLoading={false}
          showViewMore={false}
          title="Filtered Movies"
          to={Path.FilteredMovies}
          withHeader={false}
        />
      )}


      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </section>
  );
};
