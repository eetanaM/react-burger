import { createSlice } from '@reduxjs/toolkit'
import { IngredientDetailsState } from '../../utils/type'

const initialState: IngredientDetailsState = {
    currentIngredient: null,
 };


export const ingredientDetailsSlice = createSlice({
    name: "ingredient-details",
    initialState: initialState,
    reducers: {
        showIngredient: (state, action) => {
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
