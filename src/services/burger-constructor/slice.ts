import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { IDraggableIngredient, IIngredientsConstructorState, IIngredient } from '../../utils/types/type'

const initialState: IIngredientsConstructorState = {
    fillerToOrder: [],
    bunsToOrder: []
}

export const constructorSlice = createSlice({
    name: "burger-constructor",
    initialState: initialState,
    reducers: {
        addIngredientToOrder: {
            reducer(state, action: PayloadAction<IDraggableIngredient>) {
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
            prepare(ingredient: IIngredient) {
                return {
                    payload: {
                        ...ingredient,
                        key: nanoid()
                    }
                }
            }
        },
        removeIngredientFromOrder: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.fillerToOrder.findIndex(
                ingredient => ingredient.key === action.payload.id
            )
            if (index !== -1) {
                state.fillerToOrder.splice(index, 1)
            }
        },
        moveIngredient: (state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            const ingredients = state.fillerToOrder;
            ingredients[dragIndex] = [ingredients[hoverIndex], ingredients[hoverIndex] = ingredients[dragIndex]][0];
        },
        clearIngredients: (state) => state = initialState
    },
    selectors: {
        getAllIngredientsToOrder: state => state,
        getBunsToOrder: state => state.bunsToOrder,
        getFillerToOrder: state => state.fillerToOrder
    },
})

export const { getAllIngredientsToOrder, getBunsToOrder, getFillerToOrder } = constructorSlice.selectors;
export const { addIngredientToOrder } = constructorSlice.actions;
