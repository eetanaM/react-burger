import { createAction } from "@reduxjs/toolkit";


export const profileWsConnect = createAction<string, "PROFILE_ORDERS_CONNECT">("PROFILE_ORDERS_CONNECT");
export const profileWsDisconnect = createAction("PROFILE_ORDERS_DISCONNECT");
