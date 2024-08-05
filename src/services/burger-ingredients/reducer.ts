import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit'
import { getIngredients } from './actions'
import { Ingredient } from '../../utils/type'

const initialState: {
    ingredients: Ingredient[] | [],
    loading: boolean,
    error: SerializedError | null
} = {
    ingredients: [],
    loading: false,
    error: null
}

export const loadIngredients = createAsyncThunk(
    "burger-ingredients/loadIngredients",
    async () => {
        return getIngredients()
    }
)

export const ingredientsSlice = createSlice({
    name: "burger-ingredients",
    initialState: initialState,
    reducers: {},
    selectors: {
        getAllIngredients: state => state
    },
    extraReducers: builder => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.loading = false;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
        }
})

export const { getAllIngredients } = ingredientsSlice.selectors;
