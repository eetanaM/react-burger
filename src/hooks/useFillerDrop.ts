import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "./preTypedHooks";

import { getAllIngredients } from "../services/burger-ingredients/slice";
import { addIngredientToOrder } from "../services/burger-constructor/slice";

const useFillerDrop = () => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector(getAllIngredients);

    const [{ canDrop }, fillerDropRef] = useDrop<{ id: string }, unknown, { canDrop: boolean }>(() => ({
    accept: "ingredient",
    drop: (dragItem) => {
        const id = dragItem.id;
        const ingredient = ingredients.find((item) => item._id === id)
        if (!ingredient) return
        dispatch(addIngredientToOrder(ingredient));
        dispatch({
            type: "burger-ingredients/incrementCount",
            payload: {
                id: id,
            }
        })
    },
    canDrop: (dragItem) => {
        const id = dragItem.id;
        const ingredient = ingredients.find((item) => item._id === id)
        if (ingredient?.type === "bun") return false;
        return true
    },
    collect: (monitor) => ({
        canDrop:!!monitor.canDrop(),
    }),
  }))
  return { canDrop, fillerDropRef };
}

export { useFillerDrop };
