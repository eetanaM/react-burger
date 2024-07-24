import React from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css"

export default function IngredientCards(props:any): JSX.Element {
    const {ingredientsDetails, onModalOpen} = props

    return (
        /*
        Не знаком с TS, решение нашел в сети, поэтому не уверен, что оно легитимно, но если возвращать массив, TS жалуется на инвалидность элементов:
            'IngredientCards' cannot be used as a JSX component.
            Its return type 'Element[]' is not a valid JSX element.
        Поэтому возвращаю не массивом, а отдельным JSX элементом
        */
        <>
            {ingredientsDetails.map((ingredient:any, index:number) => {
            return (
                <div
                    className={`${styles.ingredient_card_details}`}
                    key={index}
                    onClick={() => onModalOpen(ingredient._id)}
                >
                    <img src={ingredient.image} alt={`${ingredient.name} preview`} className="ml-4 mr-4" />
                    <div className={`${styles.currency}`}>
                        <span className="text text_type_main-default">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <span className="text text_type_main-default">{ingredient.name}</span>
                </div>
            )
            })}
        </>
    )
}
