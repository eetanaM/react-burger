import React from "react";
import styles from "./IngredientDetails.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

export default function IngredientDetails({ currentIngredient }:any) {
    return (
        <div className={`${styles.content_container} pr-10 pl-10`}>
            <div className={`${styles.content_header} pt-10`}>
                <h3 className="text text_type_main-large">Детали ингредиентов</h3>
                <CloseIcon type="primary"/>
            </div>
            <div className={`${styles.content_main} pl-10 pt-10 pr-10`}>
                <img src={currentIngredient.image} alt={currentIngredient.name} />
                <h3 className="text text_type_main-default">{currentIngredient.name}</h3>
                <ul className={styles.content_info_list}>
                    <li className="text text_type_main-default text_color_inactive">
                        <h4>Калории, ккал</h4>
                        <span>{currentIngredient.calories}</span>
                    </li>
                    <li className="text text_type_main-default text_color_inactive">
                        <h4>Белки, г</h4>
                        <span>{currentIngredient.proteins}</span>
                    </li>
                    <li className="text text_type_main-default text_color_inactive">
                        <h4>Жиры, г</h4>
                        <span>{currentIngredient.fat}</span>
                    </li>
                    <li className="text text_type_main-default text_color_inactive">
                        <h4>Углеводы, г</h4>
                        <span>{currentIngredient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
