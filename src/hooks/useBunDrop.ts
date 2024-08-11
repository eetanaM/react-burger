import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "./preTypedHooks";

import { getAllIngredients } from "../services/burger-ingredients/reducer";
import { addIngredientToOrder } from "../services/burger-constructor/reducer";

const useBunDrop = () => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector(getAllIngredients);
    const [{ canDrop }, bunDropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (dragItem: {id: string}) => {
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

export {useBunDrop};
