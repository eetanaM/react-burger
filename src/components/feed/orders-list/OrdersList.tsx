import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/preTypedHooks";
import { useMatch } from "react-router";

import OrderCard from "./order-card/OrderCard";

import { getOrders } from "../../../services/feed/slice";
import { getProfileOrders } from "../../../services/profile-feed/slice";

import { profileWsConnect, profileWsDisconnect } from "../../../services/profile-feed/actions";

import styles from "./OrdersList.module.css"

const PROFILE_WS_URL = "wss://norma.nomoreparties.space/orders"

const OrdersList = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const isOnProfileFeedPage = useMatch('profile/orders')

    const orders = useAppSelector(getOrders);
    const profileOrders = useAppSelector(getProfileOrders);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        if (isOnProfileFeedPage) {
            dispatch(profileWsConnect(`${PROFILE_WS_URL}?token=${accessToken}`))
        }

        return () => {
            dispatch(profileWsDisconnect())
        }
    }, [])

    const ordersToRender = isOnProfileFeedPage ? profileOrders.map(order => {
        return <OrderCard
                    ingredientsIds={order.ingredients}
                    orderCreatedAt={order.createdAt}
                    orderName={order.name}
                    orderStatus={order.status}
                    orderNumber={order.number}
                    orderId={order._id}
                    key={order._id}
                />
    }) : orders.map(order => {
        return <OrderCard
                    ingredientsIds={order.ingredients}
                    orderCreatedAt={order.createdAt}
                    orderName={order.name}
                    orderStatus={order.status}
                    orderNumber={order.number}
                    orderId={order._id}
                    key={order._id}
                />
    })

    return (
        <ul className={`${isOnProfileFeedPage ? styles.orders_list_container_profile : styles.orders_list_container} custom-scroll`}>
            {ordersToRender}
        </ul>
    )
}

export default OrdersList;
