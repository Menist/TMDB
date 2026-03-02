import {configureStore} from '@reduxjs/toolkit';
import {baseApi} from "@/shared/api";
import {favoritesReducer} from "@/features/favorites/model/favoritesSlice";
import {themeReducer} from "./themeSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;