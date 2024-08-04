import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import IngredientCard from "./ingredient-card/IngredientCard";

import styles from "./BurgerIngredients.module.css"

import { useSelector } from "react-redux";
import { getAllIngredients } from '../../services/burger-ingredients/reducer';

import { IngredientProps } from "../../utils/type";

import { useModal } from "../../hooks/useModal";


export default function BurgerIngredients() {
    const { ingredients }:IngredientProps = useSelector(getAllIngredients);

    const { isModalOpen, openModal, closeModal } = useModal();
    const [current, setCurrent] = React.useState('buns')
    const [ingredientToPopId, setIngredientToPopId] = React.useState('')

    const buns = ingredients.filter(ingredient => ingredient.type === "bun");
    const main = ingredients.filter(ingredient => ingredient.type === "main");
    const sauces = ingredients.filter(ingredient => ingredient.type === "sauce");

    // || ingredientsDetails[0] - временно, для исключения возврата undefiend в currentIngredient
    const currentIngredient = ingredients.find(
        ingredient => ingredient._id === ingredientToPopId
    ) || ingredients[0]


    const onModalClose: () => void = React.useCallback((): void => {
        setIngredientToPopId('')
        closeModal();
    }, [closeModal]);

    const onModalOpen: (id: string) => void = React.useCallback((id:string):void => {
        setIngredientToPopId(id)
        openModal();
    }, [openModal]);

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
                                onModalOpen={onModalOpen}
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
                                onModalOpen={onModalOpen}
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
                                onModalOpen={onModalOpen}
                            />
                        })}
                    </div>
                </li>
            </ul>
            {isModalOpen && <Modal
                onModalClose={onModalClose}
                header="Детали ингредиента"
            >
               <IngredientDetails
                    currentIngredient = {currentIngredient}
               />
            </Modal>}
        </section>
    )
}
