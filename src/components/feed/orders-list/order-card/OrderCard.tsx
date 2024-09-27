import React, { useCallback, useMemo } from "react";
import { Location, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/preTypedHooks";
import { nanoid } from "@reduxjs/toolkit";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../../../ingredient-icon/IngredientIcon";

import { getIngredinetsState } from "../../../../services/burger-ingredients/slice";
import { showOrder } from "../../../../services/order-details/slice";

import { IIngredient, IOrderCardProps, IOrderDetailsState } from "../../../../utils/types/type";

import styles from "./OrderCard.module.css"

const OrderCard = ({
        ingredientsIds,
        orderCreatedAt,
        orderName,
        orderNumber,
        orderStatus,
    }: IOrderCardProps): React.JSX.Element => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation() as Location<{ backgroundLocation: Location }>;

    const { ingredients } = useAppSelector(getIngredinetsState);
    const orderIngredients = ingredientsIds.map(id => {
        return ingredients.find(ingredient => ingredient._id === id)
    }) as IIngredient[]

    let statusText;
    let statusTextColor;

    switch (orderStatus) {
        case "done":
            statusTextColor = {color: "#00CCCC"};
            statusText = "Выполнен";
            break;
        case "pending":
            statusTextColor = {color: "#ffffff"};
            statusText = "Готовится";
            break;
        case "canceled":
            statusTextColor = {color: "#ce0c0c"};
            statusText = "Отменен";
            break;
        case "created":
            statusTextColor = {color: "#ffffff"};
            statusText = "Создан";
            break;
    }


    const getIngredientsToRender = () => {
        if (orderIngredients.length > 5) {
            // Если ингредиентов больше 5, показываем первые 5 и скрываем оставшиеся
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
            // reverse для корректного порядка отображения при flex-flow: row-reverse
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

    const openModal = useCallback((orderNumber: number) => {
        navigate(`${orderNumber}`, { state: { backgroundLocation: location }});
    }, [dispatch])

    return (
        <li
            className={`${styles.order_card} pl-6 pr-6 pt-6 pb-6 mb-4 mr-2`}
            onClick={() => openModal(orderNumber)}
        >
            <div className={styles.order_header}>
                <span className="text text_type_digits-default">{`#${orderNumber}`}</span>
                <span className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(orderCreatedAt)}/>
                </span>
            </div>
            <h2 className="text text_type_main-medium mt-6">{orderName}</h2>
            {
                <span className="text text_type_main-small mt-2" style={statusTextColor}>
                    {statusText}
                </span>

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
