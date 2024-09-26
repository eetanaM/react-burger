import React, { useCallback, useMemo } from "react";
import { Location, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/preTypedHooks";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "./ingredient-icon/IngredientIcon";

import { getIngredinetsState } from "../../../../services/burger-ingredients/slice";
import { showOrder } from "../../../../services/order-details/slice";

import { IIngredient, IOrderCardProps } from "../../../../utils/types/type";

import styles from "./OrderCard.module.css"
import { nanoid } from "@reduxjs/toolkit";

const OrderCard = ({ ingredientsIds, createdAt, name, number, withStatus = false, status }: IOrderCardProps): React.JSX.Element => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation() as Location<{ backgroundLocation: Location }>;

    const { ingredients } = useAppSelector(getIngredinetsState);
    const orderIngredients = ingredientsIds.map(id => {
        return ingredients.find(ingredient => ingredient._id === id)
    }) as IIngredient[]

    const creationDate = new Date(createdAt)

    let statusTextColor;

    switch (status) {
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


    const getIngredientsToRender = () => {
        console.log(orderIngredients)
        if (orderIngredients.length > 5) {
            const ingredientsToRender = orderIngredients.slice(0,6)
            const restAmount = orderIngredients.length - (ingredientsToRender.length - 1);
            return ingredientsToRender.map((ingredient, index) => {
                if (index < ingredientsToRender.length - 1) {
                    return (
                        <li key={nanoid()}>
                            <IngredientIcon image={ingredient.image}/>
                        </li>
                    )
                } else {
                    return (
                        <li key={nanoid()}>
                            <IngredientIcon image={ingredient.image} restAmount={restAmount}/>
                        </li>
                    )
                }
            }).reverse()
        } else {
            return orderIngredients.map((ingredient) => (
                <li key={nanoid()}>
                    <IngredientIcon image={ingredient.image}/>
                </li>
            )).reverse();
        }
    }

    const totalPrice = useMemo(() => {
        const result = orderIngredients.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [ingredients])

    const openModal = useCallback((orderInfo: { orderNumber: number, ingredients: IIngredient[] }) => {
        dispatch(showOrder(orderInfo));
        navigate(`${orderInfo.orderNumber}`, { state: { backgroundLocation: location }});
    }, [dispatch])

    return (
        <li
            className={`${styles.order_card} pl-6 pr-6 pt-6 pb-6 mb-4 mr-2`}
            onClick={() => openModal({ orderNumber: number, ingredients: orderIngredients})}
        >
            <div className={styles.order_header}>
                <span className="text text_type_digits-default">{`#${number}`}</span>
                <span className="text text_type_main-default text_color_inactive">
                    <FormattedDate
                        date={
                            new Date(
                                creationDate.getFullYear(),
                                creationDate.getMonth(),
                                creationDate.getDate(),
                                creationDate.getHours(),
                                creationDate.getMinutes() - 2,
                                0,
                            )
                        }
                    />
                </span>
            </div>
            <h2 className="text text_type_main-medium mt-6">{name}</h2>
            {
                withStatus
                ? <span
                    className="text text_type_main-small mt-2"
                    style={statusTextColor}
                >
                    {status}
                </span>
                : null
            }
            <div className={`${styles.order_ingredients} mt-6`}>
                <ul className={styles.order_ingredients_icons}>
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
