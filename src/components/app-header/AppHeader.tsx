import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon,  } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css"

export default function AppHeader() {
    return (
        <header className={`${styles.header}`}>
            <nav className={`${styles.navigation} p-4`}>
                <div className="pl-5 pr-5 pb-4 pt-4">
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-small">Конструктор</span>
                </div>
                <div className="pl-5 pr-5 pb-4 pt-4">
                    <ListIcon type="secondary"/>
                    <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
                </div>
                <Logo />
                <div className="pl-5 pr-5 pb-4 pt-4">
                    <ProfileIcon type="secondary"/>
                    <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
                </div>
            </nav>
        </header>
    )
}
