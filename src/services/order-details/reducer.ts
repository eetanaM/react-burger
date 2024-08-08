import { createSlice } from '@reduxjs/toolkit'
import { getOrderData } from './action'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SerializedError } from '@reduxjs/toolkit'

const initialState: {
    order: {
        number: number | null,
    },
    success: boolean,
    loading: boolean,
    error: SerializedError | null,
} | null = {
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
                state.loading = false;
                state.error = action.error;
            })
        }
})

export const { getOrder } = orderDetailsSlice.selectors;
