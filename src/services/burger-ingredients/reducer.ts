import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'
import { IIngredientsState } from '../../utils/type';

const initialState: IIngredientsState = {
    ingredients: [],
    loading: false,
    error: null
}

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
                state.ingredients.forEach(ingredient => ingredient.counter = 0);
                state.loading = false;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
                state = initialState;
            })
        }
})

export const { getAllIngredients } = ingredientsSlice.selectors;
