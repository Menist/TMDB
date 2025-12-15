import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import {baseApi} from "./baseApi";
import {themeReducer, themeSlice} from "../../features/theme/model/themeSlice";
import {configApi} from "../../features/config/api/configApi";
import {favoriteMoviesReducer, favoriteSlice} from "../../features/movies/model/favoriteSlice";

export const store = configureStore({
  reducer: {
    [themeSlice.name]: themeReducer,
    [favoriteSlice.name]: favoriteMoviesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [configApi.reducerPath]: configApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, configApi.middleware),
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch