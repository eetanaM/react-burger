import { useAppSelector } from "../../hooks/preTypedHooks";
import { useFillerDrop } from "../../hooks/useFillerDrop";
import { useBunDrop } from "../../hooks/useBunDrop";

import CardListElement from "./card-list-element/CardListElement";
import ConstructorOverlay from "./constructor-overlay/ConstructorOverlay";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { getAllIngredientsToOrder } from "../../services/burger-constructor/reducer";

import { Ingredient } from "../../utils/type";

import styles from "./BurgerConstructor.module.css"


export default function BurgerConstructor() {
    const { fillerToOrder, bunsToOrder } = useAppSelector(getAllIngredientsToOrder);
    const fillerCanDrop = useFillerDrop().canDrop;
    const fillerDropRef = useFillerDrop().fillerDropRef

    const bunCanDrop = useBunDrop().canDrop;
    const topBunDropRef = useBunDrop().bunDropRef;
    const bottomBunDropRef = useBunDrop().bunDropRef;


    const renderIngredient = (ingredient: Ingredient, index: number) => {
        return (
            <CardListElement
                ingredient={ingredient}
                key={ingredient.key}
                index={index}
            />
        )
    }

    const fillers = fillerToOrder.map((ingredient, index) => {
        return renderIngredient(ingredient, index)
   })


    return (
        <ConstructorOverlay>
            {bunsToOrder.length === 0
            ?
            <div
                className={`${styles.empty_box_top} ml-8`}
                style={bunCanDrop ? {border: "solid 1px green"} : {}}
                ref={topBunDropRef}
            >
                <span
                    className="text text_type_main-default"
                >
                    Выберите булку
                </span>
            </div>
            :
            <div className="pl-8" ref={topBunDropRef}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunsToOrder[0].name} (верх)`}
                    price={bunsToOrder[0].price}
                    thumbnail={bunsToOrder[0].image}
                />
            </div>}
            {fillerToOrder.length === 0
            ? <div
                className={`${styles.empty_box_middle} ml-8 mt-4 mb-4`}
                style={fillerCanDrop ? {border: "solid 1px green"} : {}}
                ref={fillerDropRef}
            >
                <span
                    className="text text_type_main-default"
                >
                    Выберите начинку
                </span>
            </div>
            :
            <ul
                className={`${styles.burger_constructor_ingredients} mb-4 custom-scroll`}
                ref={fillerDropRef}
            >
                    {fillers}
                </ul>
            }
            {bunsToOrder.length === 0
            ? <div
                className={`${styles.empty_box_bottom} ml-8`}
                style={bunCanDrop ? {border: "solid 1px green"} : {}}
                ref={bottomBunDropRef}
            >
                <span
                    className="text text_type_main-default"
                >
                    Выберите булку
                </span>
            </div>
            :
            <div className="pl-8" ref={bottomBunDropRef}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunsToOrder[1].name} (низ)`}
                    price={bunsToOrder[1].price}
                    thumbnail={bunsToOrder[1].image}
                />
            </div>
            }
        </ConstructorOverlay>
    )
}
