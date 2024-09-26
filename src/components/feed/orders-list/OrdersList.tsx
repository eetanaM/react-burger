import React from "react";
import { useAppSelector } from "../../../hooks/preTypedHooks";

import OrderCard from "./order-card/OrderCard";

import { getOrders } from "../../../services/feed/slice";

import styles from "./OrdersList.module.css"

const OrdersList = ({ withStatus = false}: { withStatus?: boolean }): React.JSX.Element => {
    const orders = useAppSelector(getOrders)

    const ordersToRender = orders.map(order => {
        return <OrderCard
                    ingredientsIds={order.ingredients}
                    createdAt={order.createdAt}
                    name={order.name}
                    number={order.number}
                />
    })

    const ordersWithStatusToRender = orders.map(order => {
        return <OrderCard
                    ingredientsIds={order.ingredients}
                    createdAt={order.createdAt}
                    name={order.name}
                    number={order.number}
                    withStatus={true}
                    status={order.status}
                />
    })

    return (
        <ul className={`${styles.orders_list_container} custom-scroll`}>
            {withStatus ? ordersWithStatusToRender : ordersToRender}
        </ul>
    )
}

export default OrdersList;
