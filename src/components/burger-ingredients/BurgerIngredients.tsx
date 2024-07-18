import React from "react";
import { Counter, CurrencyIcon, Tab, } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css"

export default function BurgerIngredients() {
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
        </section>
    )
}
