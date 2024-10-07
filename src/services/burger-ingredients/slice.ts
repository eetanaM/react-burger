import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'
import { IIngredientsState } from '../../utils/types/type';

export const initialState: IIngredientsState = {
    ingredients: [],
    loading: false,
    error: null
}

export const ingredientsSlice = createSlice({
    name: "burger-ingredients",
    initialState: initialState,
    reducers: {
        incrementCount: (state, action: PayloadAction<{ id: string }>) => {
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
        decrementCount: (state, action: PayloadAction<{ id: string }>) => {
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
        },
        clearCounts: (state) => {
            state.ingredients.map(ingredient => ingredient.counter = 0);
        }
    },
    selectors: {
        getIngredinetsState: state => state
    },
    extraReducers: builder => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
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

export const { incrementCount, decrementCount, clearCounts } = ingredientsSlice.actions

export const { getIngredinetsState } = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer
