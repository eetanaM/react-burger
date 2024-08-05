import React from "react"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.css"
import { IngredientCardProps } from "../../../utils/type";
import { useDrag, DragPreviewImage } from "react-dnd";

export default function IngredientCard({ingredient, onModalOpen}: IngredientCardProps) {
    const id = ingredient._id;
    const [, dragRef, preview] = useDrag({
        type: 'ingredient',
        item: {id: id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <>
            <DragPreviewImage connect={preview} src={ingredient.image}/>
            <div className={styles.ingredient_card_container} key={ingredient._id} ref={dragRef}>
                <div
                    className={styles.ingredient_card_details}
                    onClick={() => onModalOpen && onModalOpen(ingredient._id)}
                >
                    <img src={ingredient.image} alt={`${ingredient.name} preview`} className="ml-4 mr-4" />
                    <div className={`${styles.currency}`}>
                        <span className="text text_type_main-default">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <span className="text text_type_main-default">{ingredient.name}</span>
                </div>
                <div className={styles.counter}>
                    <Counter count={1} size="default" extraClass="m-1"/>
                </div>
            </div>
        </>
    )
}
