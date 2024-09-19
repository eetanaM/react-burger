import React from "react";

import OrderCard from "./order-card/OrderCard";

import styles from "./OrdersList.module.css"

const OrdersList = () => {
    return (
        <section className={`${styles.orders_list_container} pt-10`}>
            <h1 className={`text text_type_main-large mb-4`}>
                Лента заказов
            </h1>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
        </section>
    )
}

export default OrdersList;
