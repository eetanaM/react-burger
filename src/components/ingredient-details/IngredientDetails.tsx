import React from "react";
import { useAppSelector } from "../../hooks/preTypedHooks";
import { getIngredinetsState } from "../../services/burger-ingredients/slice";

import styles from "./IngredientDetails.module.css"
import { useParams } from "react-router";

const IngredientDetails = (): React.JSX.Element | null => {
    const { id } = useParams<"id">()

    const { ingredients } = useAppSelector(getIngredinetsState);

    const currentIngredient = ingredients.find(ingredient => ingredient._id === id);

    return (currentIngredient ?
        <div className={`${styles.content_main}`}>
            <h1
                className={`${styles.content_main_header} text text_type_main-large mt-10 pt-3 pb-3`}
                data-testid="ingredient_details_header_test_element"
            >
                Детали ингредиента
            </h1>
            <img
                src={currentIngredient.image_large}
                alt={currentIngredient.name}
                data-testid="ingredient_details_image_test_element"
            />
            <div className="mt-4 mb-15">
                <h3
                    className="text text_type_main-medium"
                    data-testid="ingredient_details_name_test_element"
                >
                    {currentIngredient.name}
                </h3>
                <ul className={`${styles.content_main_info_list} mt-8`}>
                    <li>
                        <h4 className="text text_type_main-default text_color_inactive mb-2">Калории, ккал</h4>
                        <span
                            className="text text_type_digits-default text_color_inactive"
                            data-testid="ingredeint_details_calories_test_element"
                        >
                            {currentIngredient.calories}
                        </span>
                    </li>
                    <li>
                        <h4 className="text text_type_main-default text_color_inactive mb-2">Белки, г</h4>
                        <span
                            className="text text_type_digits-default text_color_inactive"
                            data-testid="ingredient_details_proteins_test_element"
                        >
                            {currentIngredient.proteins}
                        </span>
                    </li>
                    <li>
                        <h4 className="text text_type_main-default text_color_inactive mb-2">Жиры, г</h4>
                        <span
                            className="text text_type_digits-default text_color_inactive"
                            data-testid="ingredient_details_fat_test_element"
                        >
                            {currentIngredient.fat}
                        </span>
                    </li>
                    <li>
                        <h4 className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</h4>
                        <span
                            className="text text_type_digits-default text_color_inactive"
                            data-testid="ingredient_details_carbohydrates_test_element"
                        >
                            {currentIngredient.carbohydrates}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    : null)
}

export default IngredientDetails
