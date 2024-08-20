import { createSlice } from '@reduxjs/toolkit'

import { loadOrder } from './action'

import { OrderDetailsState } from '../../utils/type'

const initialState: OrderDetailsState = {
    order: {
        number: null,
    },
    success: false,
    loading: false,
    error: null,
}

export const orderDetailsSlice = createSlice({
    name: "order-details",
    initialState: initialState,
    reducers: {
        hideOrder: (state) => {
            state.order.number = null;
            state.success = false;
            state.loading = false;
            state.error = null;
        }
    },
    selectors: {
        getOrderInfo: (state) => state
    },
    extraReducers: builder => {
        builder
            .addCase(loadOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadOrder.fulfilled, (state, action) => {
                state.order = action.payload.order
                state.success = true;
                state.loading = false;
            })
            .addCase(loadOrder.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
                state = initialState;
            })
        }
})

export const { getOrderInfo } = orderDetailsSlice.selectors;
