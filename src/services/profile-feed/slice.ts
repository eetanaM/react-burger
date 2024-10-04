import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrdersResponse, IOrdersState } from "../../utils/types/web-socket";


const initialState: IOrdersState = {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
}

export const profileFeedSlice = createSlice({
    name: "profileFeed",
    initialState,
    reducers: {
        profileWsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload
        },
        profileWsMessage: (state, action: PayloadAction<IOrdersResponse>) => {
            const ordersReversed = action.payload.orders.reverse()
            state.success = action.payload.success;
            state.orders = ordersReversed;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.connectionError = null;
        },
    },
    selectors: {
        getProfileOrders: (state) => state.orders,
        getProfileTotal: (state) => state.total,
        getProfileTotalToday: (state) => state.totalToday,
    }
})

export const { profileWsError, profileWsMessage } = profileFeedSlice.actions;
export const { getProfileOrders, getProfileTotal, getProfileTotalToday } = profileFeedSlice.selectors
