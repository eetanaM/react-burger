import React from "react";
import { Counter, Tab, } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css"
import IngredientType from "../../utils/type";
import Modal from "../modal/Modal";
import IngredientCards from "./IngredientCards";
import IngredientDetails from "../ingredient-details/IngredientDetails";


export default function BurgerIngredients({ ingredientsDetails }: IngredientType) {
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [current, setCurrent] = React.useState('buns')
    const [ingredientToPopId, setIngredientToPopId] = React.useState<string>('')

    const bunsDetails = ingredientsDetails.filter(ingredient => ingredient.type === "bun");
    const mainDetails = ingredientsDetails.filter(ingredient => ingredient.type === "main");
    const sauceDetails = ingredientsDetails.filter(ingredient => ingredient.type === "sauce");


    const onModalClose = React.useCallback(() => {
        setIngredientToPopId('')
        setIsModalVisible(false);
    },[]);

    const onModalOpen = React.useCallback((index:any) => {
        console.log(index)
        setIngredientToPopId(index)
        setIsModalVisible(true);
    },[]);

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
                        <IngredientCards
                            ingredientsDetails={bunsDetails}
                            onModalOpen={onModalOpen}
                        />
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards
                            ingredientsDetails={sauceDetails}
                            onModalOpen={onModalOpen}
                        />
                    </div>
                </li>
                <li className={`${styles.ingredient_card_container} pb-10`}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        <IngredientCards
                            ingredientsDetails={mainDetails}
                            onModalOpen={onModalOpen}
                        />
                    </div>
                </li>
            </ul>
            {isModalVisible && <Modal
                onModalClose={onModalClose}
            >
               <IngredientDetails
                currentIngredient={ingredientsDetails.find(
                    ingredient => ingredient._id === ingredientToPopId
                )}
               />
            </Modal>}
        </section>
    )
}
