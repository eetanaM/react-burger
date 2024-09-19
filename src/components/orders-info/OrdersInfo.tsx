import React from "react";

import styles from "./OrdersInfo.module.css"

const OrderInfo = () => {
    return (
        <section className={`${styles.orders_info_container} pt-10 ml-15`}>
            <p>Информация о заказах</p>
        </section>
    )
}

export default OrderInfo;
