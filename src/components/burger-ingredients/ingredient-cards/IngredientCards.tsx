import React from "react"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCards.module.css"
import { IngredientCardProps } from "../../../utils/type";

export default function IngredientCards({ingredients, onModalOpen}: IngredientCardProps) {

    return (
        <>
            {ingredients.map((ingredient) => {
                return (
                    <div className={styles.ingredient_card_container} key={ingredient._id}>
                        <div
                            className={styles.ingredient_card_details}
                            onClick={() => onModalOpen(ingredient._id)}
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
                )
            })}
        </>
    )
}
