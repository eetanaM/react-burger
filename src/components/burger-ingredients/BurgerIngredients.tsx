import React from "react";
import { Counter, CurrencyIcon, Tab, } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css"


export default function BurgerIngredients({ ingredientsDetails }) {
    const bunsDetails = ingredientsDetails.filter(ingredient => ingredient.type === "bun");
    const mainDetails = ingredientsDetails.filter(ingredient => ingredient.type === "main");
    const sauceDetails = ingredientsDetails.filter(ingredient => ingredient.type === "sauce");

    function IngredientCards({ filteredIngredientsDetails }) {
        return filteredIngredientsDetails.map(ingredient => {
            const cardStyles: object = {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "272px",
                paddingBottom: "32px",
                rowGap: "4px"
            }
            return (
                <div style={cardStyles}>
                    <img src={ingredient.image} alt={`${ingredient.name} preview`} className="ml-4 mr-4" />
                    <div className={`${styles.currency}`}>
                        <span className="text text_type_main-default">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <span className="text text_type_main-default">{ingredient.name}</span>
                </div>
            )
        })
    }
    const [current, setCurrent] = React.useState('one')
    return (
        <section className={`${styles.burger_ingredients_container} pt-10`}>
            <h1 className={`text text_type_main-large`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tab_menu} pt-5`}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredients_list} pt-10 custom-scroll`}>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards filteredIngredientsDetails={bunsDetails}/>
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards filteredIngredientsDetails={sauceDetails}/>
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards filteredIngredientsDetails={mainDetails}/>
                    </div>
                </li>
            </ul>
        </section>
    )
}
