import { useCallback, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/preTypedHooks";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "./ingredient-card/IngredientCard";

import { getAllIngredients } from '../../services/burger-ingredients/reducer';

import styles from "./BurgerIngredients.module.css"

export default function BurgerIngredients() {
    const [current, setCurrent] = useState('buns')

    const { ingredients } = useAppSelector(getAllIngredients);

    const tabsRef = useRef<HTMLDivElement>(null);
    const bunsScrollRef = useRef<HTMLHeadingElement>(null);
    const saucesScrollRef = useRef<HTMLHeadingElement>(null);
    const mainScrollRef = useRef<HTMLHeadingElement>(null);

    const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === "bun"), [ingredients]);
    const main = useMemo(() => ingredients.filter(ingredient => ingredient.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === "sauce"), [ingredients]);

    const chooseActiveTab = () => {
        const bunsPos = bunsScrollRef.current?.getBoundingClientRect().top;
        const saucesPos = saucesScrollRef.current?.getBoundingClientRect().top;
        const mainPos = mainScrollRef.current?.getBoundingClientRect().top;

        const tabsPos = tabsRef.current?.getBoundingClientRect().bottom;

        if (bunsPos !== undefined && mainPos!== undefined && saucesPos !== undefined && tabsPos !== undefined) {
            const bunsPositionDiff = Math.abs(bunsPos - tabsPos);
            const saucesPositionDiff = Math.abs(saucesPos - tabsPos);
            const mainPositionDiff = Math.abs(mainPos - tabsPos);

            const minDiff = Math.min(bunsPositionDiff, saucesPositionDiff, mainPositionDiff)
            switch (minDiff) {
                case bunsPositionDiff: {
                    setCurrent('buns');
                    break
                }
                case saucesPositionDiff: {
                    setCurrent('sauces');
                    break
                }
                case mainPositionDiff: {
                    setCurrent('main');
                    break
                }
                default: break;
            }
        }
    }

    const moveToSection = useCallback((section: string) => {
        switch (section) {
            case 'buns': {
                bunsScrollRef.current?.scrollIntoView({ block: "start", behavior:'smooth' });
                break
            }
            case'sauces': {
                saucesScrollRef.current?.scrollIntoView({ block: "start", behavior:'smooth' });
                break
            }
            case'main': {
                mainScrollRef.current?.scrollIntoView({ block: "start", behavior:'smooth' });
                break
            }
            default:
                break;
        }
    }, [bunsScrollRef, saucesScrollRef, mainScrollRef])


    return (
        <section className={`${styles.burger_ingredients_container} pt-10`}>
            <h1 className={`text text_type_main-large`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tab_menu} pt-5`} ref={tabsRef}>
                <Tab value="buns" active={current === 'buns'} onClick={() => moveToSection("buns")}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={() => moveToSection("sauces")}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => moveToSection("main")}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredients_list} pt-10 custom-scroll`} onScroll={chooseActiveTab}>
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium" ref={bunsScrollRef}>Булки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {buns.map(bun => {
                            return <IngredientCard key={bun._id} ingredient={bun}/>
                        })}
                    </div>
                </li>
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium" ref={saucesScrollRef}>Соусы</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {sauces.map(sauce => {
                            return <IngredientCard key={sauce._id} ingredient={sauce}/>
                        })}
                    </div>
                </li>
                <li className={`${styles.ingredient_cards_container} pb-10`}>
                    <h2 className="text text_type_main-medium" ref={mainScrollRef}>Начинки</h2>
                    <div className={`${styles.ingredient_card}`}>
                        {main.map(main => {
                            return <IngredientCard key={main._id} ingredient={main}/>
                        })}
                    </div>
                </li>
            </ul>
        </section>
    )
}
