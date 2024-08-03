import { configureStore as createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const store = createStore({
  reducer: rootReducer,
});
