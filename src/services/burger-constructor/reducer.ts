import { createSlice, nanoid } from '@reduxjs/toolkit'
import { Ingredient } from '../../utils/type'
import { PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState: {
    ingredientsToOrder: Ingredient[],
} = {
    ingredientsToOrder: [],
}

export const constructorSlice = createSlice({
    name: "burger-constructor",
    initialState: initialState,
    reducers: {
        addIngredientToOrder: {
            reducer(state, action: PayloadAction<Ingredient>) {
                state.ingredientsToOrder.push(action.payload)
            },
            prepare(ingredient:Ingredient) {
                return {
                    payload: {
                        ...ingredient,
                        key: nanoid()
                    }
                }
            }
        },
        removeIngredientFromOrder: (state, action) => {
            const index = state.ingredientsToOrder.findIndex(
                ingredient => ingredient.key === action.payload
            )
            if (index !== -1) {
                state.ingredientsToOrder.splice(index, 1)
            }
        },
        clearIngredientsToOrder: state => {
            state.ingredientsToOrder = []
        },
    },
    selectors: {
        getAllIngredientsToOrder: state => state
    },
})

export const { getAllIngredientsToOrder } = constructorSlice.selectors;
export const { addIngredientToOrder, removeIngredientFromOrder, clearIngredientsToOrder } = constructorSlice.actions;
