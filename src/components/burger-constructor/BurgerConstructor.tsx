import React from "react";
import styles from "./BurgerConstructor.module.css"
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({ ingredientsDetails }) {
    // Hardcoded ingredients array just for reference
    const chosenIngredients = [ingredientsDetails[5], ingredientsDetails[4], ingredientsDetails[7], ingredientsDetails[8], ingredientsDetails[8]]

    const totalIngredientsPrice = chosenIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

    const constructedBurgerIngredients = chosenIngredients.map(ingredient => {
        return (
            <li className={`${styles.list_element} mb-4`}>
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
            <div
                style={{ display: 'flex', flexDirection: 'column'}}
                className="mb-10"
            >
                <div className="pl-8 pr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredientsDetails[0].name} (верх)`}
                        price={ingredientsDetails[0].price}
                        thumbnail={ingredientsDetails[0].image}
                    />
                </div>
                <ul
                    style={{listStyleImage: `${DragIcon}`}}
                    className={`${styles.burger_constructor_ingredients} custom-scroll`}
                >
                    {constructedBurgerIngredients}
                </ul>
                <div className="pl-8 pr-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredientsDetails[0].name} (низ)`}
                        price={ingredientsDetails[0].price}
                        thumbnail={ingredientsDetails[0].image}
                    />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'end',
                    marginBottom: '52px'
                }}
                className="mr-4"
            >
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">
                        {ingredientsDetails[0].price + totalIngredientsPrice+ ingredientsDetails[0].price}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}
