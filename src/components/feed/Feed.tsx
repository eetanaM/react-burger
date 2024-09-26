import OrderInfo from "./orders-info/OrdersInfo"
import OrdersList from "./orders-list/OrdersList"

import styles from "./Feed.module.css"

const Feed = () => {
    return (
        <>
            <div>
                <h1 className={`text text_type_main-large mt-10 mb-4`}>
                    Лента заказов
                </h1>
                <div className={styles.feed_list_container}>
                    <OrdersList />
                </div>
            </div>
            <OrderInfo />
        </>
    )
}

export default Feed
