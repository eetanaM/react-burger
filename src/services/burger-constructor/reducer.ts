import { createSlice } from '@reduxjs/toolkit'
import { IngredientProps } from '../../utils/type'

const initialState:IngredientProps = {
    ingredients: []
}

export const constructorSlice = createSlice({
    name: "burger-constructor",
    initialState: initialState,
    reducers: {
        constructorAddItem:  (state, action) => {
                state.ingredients.push(action.payload)
            }
    }
})
