import { createSlice } from '@reduxjs/toolkit'

import { loadOrder } from './action'

import { IOrderDetailsState } from '../../utils/types/type'

const initialState: IOrderDetailsState = {
    order: null,
    success: false,
}

export const orderDetailsSlice = createSlice({
    name: "order-details",
    initialState: initialState,
    reducers: {
        showOrder: (state, action) => {
            state.success = true;
            state.order = action.payload
        },
        hideOrder: state => state = initialState
    },
    selectors: {
        getOrderInfo: state => state
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
