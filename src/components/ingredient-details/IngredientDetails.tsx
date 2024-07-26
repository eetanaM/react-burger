import React from "react";
import styles from "./IngredientDetails.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientDetailsProps } from "../../utils/type";

export default function IngredientDetails({ currentIngredient, onModalClose }: IngredientDetailsProps) {
    return (
        <div className={`${styles.content_container} pr-10 pl-10`}>
            <div className={`${styles.content_header} mt-10 pt-3 pb-3`}>
                <h2 className="text text_type_main-large">Детали ингредиентов</h2>
                <button onClick={onModalClose}>
                    <CloseIcon type="primary"/>
                </button>
            </div>
            <div className={`${styles.content_main}`}>
                <img
                    src={currentIngredient.image_large}
                    alt={currentIngredient.name}
                />
                <div className="mt-4 mb-15">
                    <h3 className="text text_type_main-medium">{currentIngredient.name}</h3>
                    <ul className={`${styles.content_main_info_list} mt-8`}>
                        <li>
                            <h4 className="text text_type_main-default text_color_inactive mb-2">Калории, ккал</h4>
                            <span className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</span>
                        </li>
                        <li>
                            <h4 className="text text_type_main-default text_color_inactive mb-2">Белки, г</h4>
                            <span className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</span>
                        </li>
                        <li>
                            <h4 className="text text_type_main-default text_color_inactive mb-2">Жиры, г</h4>
                            <span className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</span>
                        </li>
                        <li>
                            <h4 className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</h4>
                            <span className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
