import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import IngredientCard from "./ingredient-card/IngredientCard";

import styles from "./BurgerIngredients.module.css"

import { useSelector } from "react-redux";
import { getAllIngredients } from '../../services/burger-ingredients/reducer';
import { getCurrentIngredient } from '../../services/ingredient-details/reducer';

import { IngredientsState } from "../../utils/type";


export default function BurgerIngredients() {
    const { ingredients }: IngredientsState = useSelector(getAllIngredients);
    const currentIngredient = useSelector(getCurrentIngredient);


    const [current, setCurrent] = React.useState('buns')

    const buns = ingredients.filter(ingredient => ingredient.type === "bun");
    const main = ingredients.filter(ingredient => ingredient.type === "main");
    const sauces = ingredients.filter(ingredient => ingredient.type === "sauce");

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
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {buns.map(bun => {
                            return <IngredientCard
                                ingredient={bun}
                                key={bun._id}
                            />
                        })}
                    </div>
                </li>
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {sauces.map(sauce => {
                            return <IngredientCard
                                ingredient={sauce}
                                key={sauce._id}
                            />
                        })}
                    </div>
                </li>
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {main.map(main => {
                            return <IngredientCard
                                ingredient={main}
                                key={main._id}
                            />
                        })}
                    </div>
                </li>
            </ul>
            {currentIngredient && <Modal
                header="Детали ингредиента"
            >
               <IngredientDetails
                    currentIngredient = {currentIngredient}
               />
            </Modal>}
        </section>
    )
}
