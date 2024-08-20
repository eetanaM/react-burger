import { createAsyncThunk } from "@reduxjs/toolkit"

import { getOrderData } from "../../utils/api"

export const loadOrder = createAsyncThunk(
    "order-details/loadOrder",
    async (ingredients: string[]) => {
        return getOrderData(ingredients)
    }
)
