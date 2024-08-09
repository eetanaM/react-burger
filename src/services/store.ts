import { configureStore as createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import customMiddleware from "./middleware/custom-middleware";

export const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware)
});


export type AppStore = typeof store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
