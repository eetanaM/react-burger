import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../services/burger-ingredients/reducer";
import { IngredientsState } from "../utils/type";

import { addIngredientToOrder } from "../services/burger-constructor/reducer";

const useFillerDrop = () => {
    const dispatch = useDispatch();
    const { ingredients }: IngredientsState = useSelector(getAllIngredients);

    const [{ canDrop }, fillerDropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (dragItem : any) => {
        const id: string = dragItem.id;
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
        const id: string = dragItem.id;
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

export {useFillerDrop};
