import React from "react";

import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";

import styles from "./BurgerConstructor.module.css"

import { IngredientProps } from "../../utils/type";

import { useModal } from "../../hooks/useModal";



export default function BurgerConstructor({ ingredients }: IngredientProps) {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [orderId, setOrderId] = React.useState('034536')

    // Hardcoded ingredients array just for reference
    const chosenIngredients = [ingredients[5], ingredients[4], ingredients[7], ingredients[8], ingredients[8]]

    const totalIngredientsPrice = chosenIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

    const constructedBurgerIngredients = chosenIngredients.map((ingredient, index) => {
        return (
            <li className={`${styles.list_element} mb-4`} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                />
            </li>
        )
   })


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
                <ul className={`${styles.burger_constructor_ingredients} custom-scroll`}>
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
                        {ingredients[0].price + totalIngredientsPrice+ ingredients[0].price}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen &&
            <Modal onModalClose={closeModal}>
                <OrderDetails onModalClose={openModal} orderId={orderId}/>
            </Modal>
            }
        </section>
    )
}
