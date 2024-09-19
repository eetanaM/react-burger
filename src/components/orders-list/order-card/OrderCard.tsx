import React, { useMemo } from "react";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./OrderCard.module.css"
import IngredientIcon from "./ingredient-icon/IngredientIcon";

const OrderCard = (): React.JSX.Element => {
    const today = new Date()
    const ingredients = [
        {
            _id:"643d69a5c3f7b9001cfa093c",
            name:"Краторная булка N-200i",
            type:"bun",
            proteins:80,
            fat:24,
            carbohydrates:53,
            calories:420,
            price:1255,
            image:"https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v:0,
            counter:0
        },
        {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
            counter: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
            counter: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
            __v: 0,
            counter: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0945',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
            __v: 0,
            counter: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            __v: 0,
            counter: 0
          },
    ]

    const totalPrice = useMemo(() => {
        const result = ingredients.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [ingredients])


    return (
        <div className={`${styles.order_card} pl-6 pr-6 pt-6 pb-6 mb-4 mr-2`}>
            <div className={styles.order_header}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate
                        date={
                            new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                today.getDate(),
                                today.getHours(),
                                today.getMinutes() - 1,
                                0,
                            )
                        }
                    />
                </p>
            </div>
            <p className="text text_type_main-medium mt-6">Death Star Starship Main бургер</p>
            <div className={`${styles.order_ingredients} mt-6`}>
                <ul className={styles.order_ingredients_icons}>
                {/* reverse() для корректного наложения иконок при flex-direction: row-reverse */}
                    {ingredients.map((ingredient) => (
                        <IngredientIcon ingredient={ingredient}/>
                    )).reverse()}
                </ul>
                <div className={styles.total_price}>
                    <span className="text text_type_digits-default">
                        {totalPrice}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
