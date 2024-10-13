import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrdersResponse, IOrdersState } from "../../utils/types/web-socket";


export const initialState: IOrdersState = {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload
        },
        wsMessage: (state, action: PayloadAction<IOrdersResponse>) => {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.connectionError = null;
        },
    },
    selectors: {
        getOrders: (state) => state.orders,
        getTotal: (state) => state.total,
        getTotalToday: (state) => state.totalToday,
    }
})

export const { wsError, wsMessage } = feedSlice.actions;

export const { getOrders, getTotal, getTotalToday } = feedSlice.selectors

export const feedReducer = feedSlice.reducer
