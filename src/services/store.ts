import { configureStore as createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const store = createStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
