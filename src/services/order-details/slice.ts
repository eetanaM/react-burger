import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { loadOrder } from './action'

import { IOrderDetailsState } from '../../utils/types/type'

export const initialState: IOrderDetailsState = {
    order: null,
    success: false,
    error: null,
}

export const orderDetailsSlice = createSlice({
    name: "order-details",
    initialState: initialState,
    reducers: {
        showOrder: (state, action: PayloadAction<IOrderDetailsState["order"]>) => {
            state.success = true;
            state.order = action.payload
        },
        hideOrder: () => initialState
    },
    selectors: {
        getOrderInfo: state => state
    },
    extraReducers: builder => {
        builder
            .addCase(loadOrder.pending, (state) => {
                state.error = null
            })
            .addCase(loadOrder.fulfilled, (state, action) => {
                const { ingredients, number, status, name, _id, createdAt } = action.payload.order
                state.order = {
                    ingredients: ingredients,
                    number: number,
                    status: status,
                    name: name,
                    _id: _id,
                    createdAt: createdAt,
                }
                state.success = true;
            })
            .addCase(loadOrder.rejected, (state, action) => {
                state.success = false;
                state.error = action.error
            })
        }
})

export const { showOrder, hideOrder } = orderDetailsSlice.actions;

export const { getOrderInfo } = orderDetailsSlice.selectors;

export const orderDetailsReducer = orderDetailsSlice.reducer
