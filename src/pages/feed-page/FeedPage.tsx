import React from "react"

import OrdersList from "../../components/orders-list/OrdersList"
import OrderInfo from "../../components/orders-info/OrdersInfo";
import styles from "./FeedPage.module.css"
import Preloader from "../../components/preloader/Preloader";

const FeedPage = (): React.JSX.Element => {
    const loading = false;
    const error = false;

    if (loading) {
        return (
          <>
            <div className={styles.loading_container}>
              <h1 className="text text_type_main-large"> Загрузка... </h1>
              <Preloader />
            </div>
          </>
        )
      }

      if (!loading && error) {
        return (
          <>
            <div className={styles.loading_container}>
                <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
            </div>
          </>
        )
      }

    return (
        <>
            <div className={styles.feed_page_container}>
                <OrdersList />
                <OrderInfo />
            </div>
        </>
    )
}

export default FeedPage;
