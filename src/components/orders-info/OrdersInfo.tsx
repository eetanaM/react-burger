import React from "react";

import styles from "./OrdersInfo.module.css"

const OrderInfo = () => {
    const finishedOrders = [
        '034533',
        '034534',
        '034535',
        '034537',
        '034538',
        '034577',
        '034556',
        '034559',
        '034560',
        '034561',
        '034562',
        '034563',
        '034564',
    ]

    const finishedOrdersElements = finishedOrders.map(order => {
        return <p className='text text_type_digits-default'>{order}</p>
    })
    return (
        <section className={`${styles.orders_info_container} pt-10 ml-15`}>
            <div className={`${styles.orders_info_status} mb-15`}>
                <div className={`${styles.orders_info_status_done} mr-9`}>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div className={styles.orders_info_status_done_list}>
                        {finishedOrdersElements}
                    </div>
                </div>
                <div className={styles.orders_info_status_in_work}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div className={styles.orders_info_status_in_work_list}>
                        {finishedOrdersElements}
                    </div>
                </div>
            </div>
            <div className={`${styles.orders_info_done_all} mb-15`}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">28752</p>
            </div>
            <div className={styles.orders_info_done_today}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">138</p>
            </div>
        </section>
    )
}

export default OrderInfo;
