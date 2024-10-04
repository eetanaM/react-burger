import React from "react"
import { useAppSelector } from "../../../hooks/preTypedHooks"
import { getOrders, getTotal, getTotalToday } from "../../../services/feed/slice"

import styles from "./OrdersInfo.module.css"

const OrderInfo = () => {
    const orders = useAppSelector(getOrders)
    const totalOrders = useAppSelector(getTotal)
    const totalOrdersToday = useAppSelector(getTotalToday)
    const finishedOrders = orders.filter(order => {
        return order.status === "done"
    })
    const inWorkOrders = orders.filter(order => {
        return order.status !== "done"
    })

    const finishedOrdersElements = finishedOrders.map(order => {
        return <p className='text text_type_digits-default' key={order._id}>{order.number}</p>
    })

    const inWorkOrdersElements = inWorkOrders.map(order => {
        return <p className='text text_type_digits-default' key={order._id}>{order.number}</p>
    })

    return (
        <section className={`${styles.orders_info_container} pt-10 ml-15`}>
            <div className={`${styles.orders_info_status} mb-15`}>
                <div className='mr-9'>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div className={styles.orders_info_status_done_list}>
                        {finishedOrdersElements}
                    </div>
                </div>
                <div>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div className={styles.orders_info_status_in_work_list}>
                        {inWorkOrdersElements}
                    </div>
                </div>
            </div>
            <div className={`${styles.orders_info_done_all} mb-15`}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{totalOrders}</p>
            </div>
            <div className={styles.orders_info_done_today}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{totalOrdersToday}</p>
            </div>
        </section>
    )
}

export default React.memo(OrderInfo);
