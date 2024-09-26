import { configureStore as createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import customMiddleware from "./middleware/custom-middleware";
import { socketMiddleware } from "./middleware/socket-middleware";
import { profileSocketMiddleware } from "./middleware/profile-socket-middleware";

import { wsConnect, wsDisconnect } from "./feed/actions";
import { cleanOrders, wsError, wsMessage } from "./feed/slice";

import { profileWsConnect, profileWsDisconnect } from "./profile-feed/actions";
import { profileWsError, profileWsMessage } from "./profile-feed/slice";

import { IOrdersResponse } from "../utils/types/web-socket";

const feedMiddleware = socketMiddleware<unknown, IOrdersResponse>({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onError: wsError,
  onMessage: wsMessage,
  onClose: cleanOrders,
})

const profileFeedMiddleware = profileSocketMiddleware<unknown, IOrdersResponse>({
  connect: profileWsConnect,
  disconnect: profileWsDisconnect,
  onError: profileWsError,
  onMessage: profileWsMessage,
  onClose: cleanOrders,
})

export const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware, feedMiddleware, profileFeedMiddleware)
});


export type AppStore = typeof store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
