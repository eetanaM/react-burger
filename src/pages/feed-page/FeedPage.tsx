import React, { useEffect } from "react"

import Preloader from "../../components/preloader/Preloader";
import Feed from "../../components/feed/Feed";

import { useAppDispatch } from "../../hooks/preTypedHooks";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";

import styles from "./FeedPage.module.css"

const FeedPage = (): React.JSX.Element => {
    const loading = false;
    const error = false;
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'))

      return () => {
        dispatch(wsDisconnect())
       }
    }, [])

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
              <Feed />
            </div>
        </>
    )
}

export default FeedPage;
