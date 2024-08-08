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
    reducers: {
        incrementCount: (state, action) => {
            if (state.ingredients.length === 0) return;
            const currentIndex = state.ingredients.findIndex(
                ingredient => ingredient._id === action.payload.id
            )
            if (currentIndex !== -1) {
                if(state.ingredients[currentIndex].type === "bun") {
                    state.ingredients[currentIndex].counter += 2;
                } else
                state.ingredients[currentIndex].counter++;
            }
        },
        decrementCount: (state, action) => {
            if (state.ingredients.length === 0) return;
            const currentIndex = state.ingredients.findIndex(
                ingredient => ingredient._id === action.payload.id
            )
            if (currentIndex !== -1) {
                if(state.ingredients[currentIndex].type === "bun") {
                    state.ingredients[currentIndex].counter -= 2;
                } else
                state.ingredients[currentIndex].counter--;
            }
        }
    },
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
                state.ingredients.forEach((ingredient) => {
                    if (ingredient) ingredient.counter = 0
                });
                state.loading = false;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
        }
})

export const { getAllIngredients } = ingredientsSlice.selectors;
