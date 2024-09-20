import React from "react";

import OrderCard from "./order-card/OrderCard";

import styles from "./OrdersList.module.css"

const OrdersList = ({ withStatus = false}: { withStatus?: boolean }): React.JSX.Element => {
    return (
        <section className={`${styles.orders_list_container}`}>
            {withStatus ?
            <>
                <OrderCard withStatus={true}/>
                <OrderCard withStatus={true}/>
                <OrderCard withStatus={true}/>
                <OrderCard withStatus={true}/>
                <OrderCard withStatus={true}/>
            </>
            :
            <>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </>
            }
        </section>
    )
}

export default OrdersList;
