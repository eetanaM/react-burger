import { useDrag, DragPreviewImage } from "react-dnd";
import { useAppDispatch } from "../../../hooks/preTypedHooks";

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { Ingredient, IngredientCardProps } from "../../../utils/type";

import styles from "./IngredientCard.module.css"

export default function IngredientCard({ingredient}: IngredientCardProps) {
    const dispatch = useAppDispatch()
    const [, dragRef, preview] = useDrag({
        type: 'ingredient',
        item: {id: ingredient._id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    function openModal(ingredient: Ingredient) {
        dispatch({
            type: 'ingredient-details/showIngredient',
            payload: {
                ...ingredient,
            }
        })

    }

    return (
        <>
            <DragPreviewImage connect={preview} src={ingredient.image}/>
            <div className={styles.ingredient_card_container} key={ingredient._id} ref={dragRef}>
                <div
                    className={styles.ingredient_card_details}
                    onClick={() => openModal(ingredient)}
                >
                    <img src={ingredient.image} alt={`${ingredient.name} preview`} className="ml-4 mr-4" />
                    <div className={`${styles.currency}`}>
                        <span className="text text_type_main-default">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <span className="text text_type_main-default">{ingredient.name}</span>
                </div>
                <div className={styles.counter} style={ingredient.counter === 0 ? {display: "none"} : {}}>
                    <Counter count={ingredient.counter} size="default" extraClass="m-1"/>
                </div>
            </div>
        </>
    )
}
