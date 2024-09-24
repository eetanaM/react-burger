import React from "react";

import OrderCard from "./order-card/OrderCard";

import styles from "./OrdersList.module.css"

const OrdersList = ({ withStatus = false}: { withStatus?: boolean }): React.JSX.Element => {
    return (
        <ul className={`${styles.orders_list_container} custom-scroll`}>
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
        </ul>
    )
}

export default OrdersList;
