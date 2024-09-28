import React, { useEffect } from "react"

import Preloader from "../../components/preloader/Preloader";
import Feed from "../../components/feed/Feed";

import { useAppDispatch } from "../../hooks/preTypedHooks";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";

import styles from "./FeedPage.module.css"

const FeedPage = (): React.JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'))

      return () => {
        dispatch(wsDisconnect())
       }
    }, [])

    return (
        <>
            <div className={styles.feed_page_container}>
              <Feed />
            </div>
        </>
    )
}

export default FeedPage;
