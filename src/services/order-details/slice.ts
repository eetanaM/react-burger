import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
        }
})

export const { showOrder, hideOrder } = orderDetailsSlice.actions
export const { getOrderInfo } = orderDetailsSlice.selectors;
