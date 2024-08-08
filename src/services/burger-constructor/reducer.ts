import { createSlice, nanoid } from '@reduxjs/toolkit'
import { Ingredient, IngredientsToOrderState } from '../../utils/type'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: IngredientsToOrderState = {
    fillerToOrder: [],
    bunsToOrder: []
}

export const constructorSlice = createSlice({
    name: "burger-constructor",
    initialState: initialState,
    reducers: {
        addIngredientToOrder: {
            reducer(state, action: PayloadAction<Ingredient>) {
                if(action.payload.type === "bun") {
                    if (state.bunsToOrder.length === 0) {
                        state.bunsToOrder.push(action.payload);
                        state.bunsToOrder.push(action.payload);
                    } else {
                        state.bunsToOrder[0] = action.payload
                        state.bunsToOrder[1] = action.payload
                    }
                } else state.fillerToOrder.push(action.payload)
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
            const index = state.fillerToOrder.findIndex(
                ingredient => ingredient.key === action.payload.id
            )
            if (index !== -1) {
                state.fillerToOrder.splice(index, 1)
            }
        },
        moveIngredient: (state, action) => {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            const ingredients = state.fillerToOrder;
            ingredients[dragIndex] = [ingredients[hoverIndex], ingredients[hoverIndex] = ingredients[dragIndex]][0];
        }
    },
    selectors: {
        getAllIngredientsToOrder: state => state,
        getBunsToOrder: state => state.bunsToOrder,
        getFillerToOrder: state => state.fillerToOrder
    },
})

export const { getAllIngredientsToOrder, getBunsToOrder, getFillerToOrder } = constructorSlice.selectors;
export const { addIngredientToOrder, removeIngredientFromOrder } = constructorSlice.actions;
