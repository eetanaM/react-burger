import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "./preTypedHooks";

import { getIngredinetsState } from "../services/burger-ingredients/slice";
import { addIngredientToOrder } from "../services/burger-constructor/slice";

const useBunDrop = () => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector(getIngredinetsState);
    const [{ canDrop }, bunDropRef] = useDrop<{ id: string }, unknown, { canDrop: boolean }>(() => ({
    accept: "ingredient",
    drop: (dragItem) => {
        const id = dragItem.id;
        const ingredient = ingredients.find((item) => item._id === id);
        if (!ingredient) return
        dispatch(addIngredientToOrder(ingredient));
        dispatch({
            type: "burger-ingredients/incrementCount",
            payload: {
                id: id,
            }
        });
    },
    canDrop: (dragItem) => {
        const id = dragItem.id;
        const ingredient = ingredients.find((item) => item._id === id)
        if (ingredient?.type === "sauce" || ingredient?.type === "main" ) return false;
        return true
    },
    collect: (monitor) => ({
        canDrop:!!monitor.canDrop(),
    }),
  }))
  return { canDrop, bunDropRef };
}

export { useBunDrop };
