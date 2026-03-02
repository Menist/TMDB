import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light"

const initialState = {
  themeMode: (localStorage.getItem('theme') as ThemeMode) || 'dark'
}
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark'
    }
  }
})

export const {toggleTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer


