import React from "react";
import { Counter, CurrencyIcon, Tab, } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css"

interface ingredients {
    ingredientsDetails: {
        _id: string;
        name: string;
        type: string;
        proteins:number;
        fat: number;
        carbohydrates: number;
        calories: number;
        price: number;
        image: string;
        image_mobile: string;
        image_large: string;
        __v: number;
    }[]
}

export default function BurgerIngredients({ ingredientsDetails }: ingredients) {
    const bunsDetails = ingredientsDetails.filter(ingredient => ingredient.type === "bun");
    const mainDetails = ingredientsDetails.filter(ingredient => ingredient.type === "main");
    const sauceDetails = ingredientsDetails.filter(ingredient => ingredient.type === "sauce");

    function IngredientCards({ ingredientsDetails }: ingredients): JSX.Element {
        return (
            /*
            Не знаком с TS, решение нашел в сети, поэтому не уверен, что оно легитимно, но если возвращать массив, TS жалуется на инвалидность элементов:
                'IngredientCards' cannot be used as a JSX component.
                Its return type 'Element[]' is not a valid JSX element.
            Поэтому возвращаю не массивом, а отдельным JSX элементом
            */
            <>
                {ingredientsDetails.map(ingredient => {
                return (
                    <div className={`${styles.ingredient_card_details}`}>
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
    const [current, setCurrent] = React.useState('buns')
    return (
        <section className={`${styles.burger_ingredients_container} pt-10`}>
            <h1 className={`text text_type_main-large`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tab_menu} pt-5`}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredients_list} pt-10 custom-scroll`}>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards ingredientsDetails={bunsDetails}/>
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards ingredientsDetails={sauceDetails}/>
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards ingredientsDetails={mainDetails}/>
                    </div>
                </li>
            </ul>
        </section>
    )
}
