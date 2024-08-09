import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Ingredient, IngredientDetailsState } from '../../utils/type'

const initialState: IngredientDetailsState = {
    currentIngredient: null,
 };


export const ingredientDetailsSlice = createSlice({
    name: "ingredient-details",
    initialState: initialState,
    reducers: {
        showIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.currentIngredient = action.payload;
        },
        hideIngredient: (state) => {
            state.currentIngredient = null;
        },
    },
    selectors: {
        getCurrentIngredient: (state) => state.currentIngredient
    },
})

export const { getCurrentIngredient } = ingredientDetailsSlice.selectors;
