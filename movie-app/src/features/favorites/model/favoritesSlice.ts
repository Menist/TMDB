import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type {Movie} from "@/entities/movie/model/schemas";

type FavoritesState = {
  movies: Movie[]
}

const initialState: FavoritesState = {
  movies: JSON.parse(localStorage.getItem('favorites') || '[]')
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload)
    }
  }
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
