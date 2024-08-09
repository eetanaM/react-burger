import { createSlice } from '@reduxjs/toolkit'
import { getOrderData } from './action'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderDetailsState } from '../../utils/type'

const initialState: OrderDetailsState = {
    order: {
        number: null,
    },
    success: false,
    loading: false,
    error: null,
}

export const loadOrder = createAsyncThunk(
        "order-details/loadOrder",
        async (ingredients: string[]) => {
            return getOrderData(ingredients)
        }
    )

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
        getOrder: (state) => state.order
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

export const { getOrder } = orderDetailsSlice.selectors;
