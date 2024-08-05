import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../services/burger-ingredients/reducer";
import { IngredientsState } from "../utils/type";

import { addIngredientToOrder } from "../services/burger-constructor/reducer";

const useBunsDrop = () => {
    const dispatch = useDispatch();
    const { ingredients }: IngredientsState = useSelector(getAllIngredients);

    const [{ canDrop }, bunDropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (dragItem : any, monitor) => {
        const id: string = dragItem.id;
        const ingredient = ingredients.find((item) => item._id === id)
        if (!ingredient) return
        dispatch(addIngredientToOrder(ingredient));
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
  return { canDrop, bunDropRef };
}

export {useBunsDrop};
