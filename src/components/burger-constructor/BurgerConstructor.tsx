import React from "react";
import styles from "./BurgerConstructor.module.css"
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor() {
    return (
        <section className={`${styles.burger_constructor_container} pt-25`}>
            <h1 className={`text text_type_main-large`}>
                Конструктор сюда!
            </h1>
        </section>
    )
}
