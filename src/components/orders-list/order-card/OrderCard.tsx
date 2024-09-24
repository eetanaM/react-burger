import React, { useCallback, useMemo } from "react";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./OrderCard.module.css"
import IngredientIcon from "./ingredient-icon/IngredientIcon";
import { useAppDispatch } from "../../../hooks/preTypedHooks";
import { Location, useLocation, useNavigate } from "react-router";
import { IIngredient } from "../../../utils/types/type";

const OrderCard = ({ withStatus = false}: { withStatus?: boolean }): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation() as Location<{ backgroundLocation: Location }>;

    const today = new Date();
    let orderStatus = "Выполнен";
    let statusTextColor;

    switch (orderStatus) {
        case "Выполнен":
            statusTextColor = {color: "#00CCCC"};
            break;
        case "Готовится":
            statusTextColor = {color: "#ffffff"};
            break;
        case "Отменен":
            statusTextColor = {color: "#ce0c0c"};
            break;
        case "Создан":
            statusTextColor = {color: "#ffffff"};
            break;
    }

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

    const order = {
        ingredients: ingredients,
        status: "Выполнен",
        number: '034533',
        name: "Death Star Starship Main бургер",
    }

    const getIngredientsToRender = () => {
        if (ingredients.length > 5) {
            let ingredientsToRender = ingredients.slice(0,6)
            const restAmount = ingredients.length - (ingredientsToRender.length - 1);
            return ingredientsToRender.map((ingredient, index) => {
                if (index < ingredientsToRender.length - 1) {
                    return (
                        <li key={ingredient._id}>
                            <IngredientIcon image={ingredient.image} key={ingredient._id}/>
                        </li>
                    )
                } else {
                    return (
                        <li key={ingredient._id}>
                            <IngredientIcon image={ingredient.image} key={ingredient._id} restAmount={restAmount}/>
                        </li>
                    )
                }
            }).reverse()
        } else {
            return ingredients.map((ingredient) => (
                <li key={ingredient._id}>
                    <IngredientIcon image={ingredient.image} key={ingredient._id}/>
                </li>
            )).reverse();
        }
    }

    const totalPrice = useMemo(() => {
        const result = ingredients.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [ingredients])

    const openModal = useCallback((orderInfo: { number:string, ingredients: IIngredient[] }) => {
        dispatch({
            type: "order-details/showOrder",
            payload: orderInfo
        });
        navigate(`${orderInfo.number}`, { state: { backgroundLocation: location }});
    }, [dispatch])

    return (
        <li
            className={`${styles.order_card} pl-6 pr-6 pt-6 pb-6 mb-4 mr-2`}
            onClick={() => openModal(order)}
        >
            <div className={styles.order_header}>
                <span className="text text_type_digits-default">{`#${order.number}`}</span>
                <span className="text text_type_main-default text_color_inactive">
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
                </span>
            </div>
            <h2 className="text text_type_main-medium mt-6">Death Star Starship Main бургер</h2>
            {
                withStatus
                ? <span
                    className="text text_type_main-small mt-2"
                    style={statusTextColor}
                >
                    {orderStatus}
                </span>
                : null
            }
            <div className={`${styles.order_ingredients} mt-6`}>
                <ul className={styles.order_ingredients_icons}>
                {/* reverse() для корректного наложения иконок при flex-direction: row-reverse */}
                    {getIngredientsToRender()}
                </ul>
                <div className={styles.total_price}>
                    <span className="text text_type_digits-default">
                        {totalPrice}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </li>
    )
}

export default OrderCard
