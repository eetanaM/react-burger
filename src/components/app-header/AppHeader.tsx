import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css"

export default function AppHeader() {
    return (
        <header className={`${styles.header}`}>
            <section className={`${styles.main_section} pt-4 pb-4`}>
                <nav className={`${styles.navigation}`}>
                    <button className={`${styles.header_button} pl-5 pr-5 pb-4 pt-4`}>
                        <BurgerIcon type="primary"/>
                        <span className="text text_type_main-small">Конструктор</span>
                    </button>
                    <button className={`${styles.header_button} pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type="secondary"/>
                        <span className="text text_type_main-small text_color_inactive">Лента заказов</span>
                    </button>
                </nav>
                <Logo />
                <button className={`${styles.header_button} ${styles.profile_button} pl-5 pr-5 pb-4 pt-4`}>
                    <ProfileIcon type="secondary"/>
                    <span className="text text_type_main-small text_color_inactive">Личный кабинет</span>
                </button>
            </section>
        </header>
    )
}
