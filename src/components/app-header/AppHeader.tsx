import React from "react";
import { useAppSelector } from "../../hooks/preTypedHooks";
import { NavLink } from "react-router-dom";

import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

import { getUserInfo } from "../../services/profile/reducer";

import styles from "./AppHeader.module.css"

function AppHeader(){
    const user = useAppSelector(getUserInfo)
    const chooseTextStyle = (isActive: boolean) => {
        return `text text_type_main-small ${isActive ? '' : 'text_color_inactive'}`
    }

    return (
        <header className={`${styles.header}`}>
            <section className={`${styles.main_section} pt-4 pb-4`}>
                <nav className={`${styles.navigation}`}>
                    <NavLink
                        to="/"
                        className={`${styles.header_button} pl-5 pr-5 pb-4 pt-4`}
                    >
                        {({ isActive }) => (
                            <>
                                <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                                <span
                                    className={chooseTextStyle(isActive)}
                                >
                                    Конструктор
                                </span>
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to="/orders-list"
                        className={`${styles.header_button} pl-5 pr-5 pb-4 pt-4`}
                    >
                        {({ isActive }) => (
                            <>
                                <ListIcon type={isActive ? "primary" : "secondary"}/>
                                <span
                                    className={chooseTextStyle(isActive)}
                                >
                                    Лента заказов
                                </span>
                            </>
                        )}
                    </NavLink>
                </nav>
                <Logo />
                <NavLink
                    to="/profile"
                    className={`${styles.header_button} ${styles.profile_button} pl-5 pr-5 pb-4 pt-4`}
                >
                    {({ isActive }) => (
                    <>
                        <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                        <span
                            className={chooseTextStyle(isActive)}
                        >
                            {user ? user.name :"Личный кабинет"}
                        </span>
                    </>
                    )}
                </NavLink>
            </section>
        </header>
    )
}

export default React.memo(AppHeader)
