import {BrowserRouter} from "react-router-dom";
import type {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {ErrorBoundary} from "./ErrorBoundary";

type Props = {
  children: ReactNode
}

export const AppProvider = ({children}: Props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )
}