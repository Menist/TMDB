import {createSlice} from "@reduxjs/toolkit";
import type {BaseMovieSchemaType} from "../../../shared/api/schemas";

export type FavoriteIdsType = BaseMovieSchemaType[];

const initialState = {
  favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies") ?? "[]") as FavoriteIdsType,
};

export const favoriteSlice = createSlice({
  name: "favoriteFilms",
  initialState,
  selectors: {
    selectFavoriteFilms: (state) => state.favoriteMovies,
  },
  reducers: (create) => ({
    toggleFavorite: create.reducer<{ movie: BaseMovieSchemaType }>((state, action) => {
      const exists = state.favoriteMovies.find(el => el.id === action.payload.movie.id);
      if (exists) {
        state.favoriteMovies = state.favoriteMovies.filter((item) => item.id !== action.payload.movie.id);
      } else {
        state.favoriteMovies.push(action.payload.movie);
      }
    }),
  }),
});

export const {selectFavoriteFilms} = favoriteSlice.selectors;
export const {toggleFavorite} = favoriteSlice.actions;
export const favoriteMoviesReducer = favoriteSlice.reducer;
