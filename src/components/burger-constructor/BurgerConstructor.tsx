import React, { useEffect } from "react";
import { DragObjectFactory, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { useBunsDrop } from "../../hooks/useBunsDrop";

import styles from "./BurgerConstructor.module.css"

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import CardListElement from "./card-list-element/CardListElement";

import {IngredientsToOrderState, IngredientsState, Ingredient } from "../../utils/type";
import { DragSourceHookSpec } from "react-dnd";

import { addIngredientToOrder, getAllIngredientsToOrder } from "../../services/burger-constructor/reducer";
import { getAllIngredients } from "../../services/burger-ingredients/reducer";



export default function BurgerConstructor() {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [orderId] = React.useState('034536');
    const dispatch = useDispatch();
    const { ingredientsToOrder }: IngredientsToOrderState = useSelector(getAllIngredientsToOrder);
    const { ingredients }: IngredientsState = useSelector(getAllIngredients);
    const bunCanDrop = useBunsDrop().canDrop;
    const bunDropRef = useBunsDrop().bunDropRef

    const constructedBurgerIngredients = ingredientsToOrder.map((ingredient) => {
        return <CardListElement ingredient={ingredient} key={ingredient.key}/>
   })

   if (ingredientsToOrder.length === 0) {
    return (
        <section className={`${styles.burger_constructor_container} pt-25 pl-4 ml-10`}>
             <div className={`${styles.burger_constructor_ingredients_container} ml-8 mb-10`}>
                <div className={`${styles.empty_box_top} pl-8 pr-4`}></div>
                <div
                className={`${styles.empty_box_middle} mt-4 mb-4`}
                style={bunCanDrop ? {border: "solid 1px green"} : {}}
                ref={bunDropRef}>
                </div>
                <div className={`${styles.empty_box_bottom} pl-8 pr-4`}></div>
            </div>
            <div className={`${styles.order_info} mr-4`}>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">
                        {ingredients[0].price + ingredients[0].price}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen &&
            <Modal onModalClose={closeModal}>
                <OrderDetails orderId={orderId}/>
            </Modal>
            }
        </section>
    )
   }

    return (
        <section className={`${styles.burger_constructor_container} pt-25 pl-4 ml-10`}>
             <div className={`${styles.burger_constructor_ingredients_container} mb-10`}>
                <div className="pl-8 pr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredients[0].name} (верх)`}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </div>
                <ul className={`${styles.burger_constructor_ingredients} custom-scroll`} ref={bunDropRef}>
                    {constructedBurgerIngredients}
                </ul>
                <div className="pl-8 pr-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredients[0].name} (низ)`}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </div>
            </div>
            <div className={`${styles.order_info} mr-4`}>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">
                        {ingredients[0].price + ingredients[0].price}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen &&
            <Modal onModalClose={closeModal}>
                <OrderDetails orderId={orderId}/>
            </Modal>
            }
        </section>
    )
}
