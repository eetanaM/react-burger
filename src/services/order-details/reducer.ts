import { createSlice } from '@reduxjs/toolkit'

import { loadOrder } from './action'

import { OrderDetailsState } from '../../utils/type'

const initialState: OrderDetailsState = {
    order: null,
    success: false,
}

export const orderDetailsSlice = createSlice({
    name: "order-details",
    initialState: initialState,
    reducers: {
        hideOrder: () => initialState
    },
    selectors: {
        getOrderInfo: (state) => state
    },
    extraReducers: builder => {
        builder
            .addCase(loadOrder.fulfilled, (state, action) => {
                state.order = action.payload.order
                state.success = true;
            })
        }
})

export const { getOrderInfo } = orderDetailsSlice.selectors;
