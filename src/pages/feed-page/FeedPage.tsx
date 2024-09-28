import React, { useEffect } from "react"

import Feed from "../../components/feed/Feed";

import { useAppDispatch } from "../../hooks/preTypedHooks";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";

import { NORMA_WEB_SOCKET_URL } from "../../utils/api";

import styles from "./FeedPage.module.css"

const FeedPage = (): React.JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(wsConnect(`${NORMA_WEB_SOCKET_URL}/all`))

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
