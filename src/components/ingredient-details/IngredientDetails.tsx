import React from "react";
import { useAppSelector } from "../../hooks/preTypedHooks";
import { getAllIngredients } from "../../services/burger-ingredients/reducer";

import styles from "./IngredientDetails.module.css"
import { useParams } from "react-router";

const IngredientDetails = (): React.JSX.Element | null => {
    const { id } = useParams<"id">()

    const { ingredients } = useAppSelector(getAllIngredients);

    const currentIngredient = ingredients.find(ingredient => ingredient._id === id);

    return (currentIngredient ?
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
    : null)
}

export default IngredientDetails
