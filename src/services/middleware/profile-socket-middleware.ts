import { Middleware } from "redux"
import { TProfileWsActionTypes } from "../../utils/types/web-socket"
import { RootState } from "../store"
import { refreshToken } from "../../utils/api";

const RECONNECT_PERIOD = 2000;

export const profileSocketMiddleware = <S, R>(wsProfileActions: TProfileWsActionTypes<S, R>): Middleware<{}, RootState> => {

    return store => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";
        const {
            connect,
            disconnect,
            onError,
            onMessage,
        } = wsProfileActions

        return next => {
            return action => {
                const { dispatch } = store;

                if (connect.match(action)) {
                    socket = new WebSocket(action.payload);
                    url = action.payload;
                    isConnected = true;

                    socket.onerror = () => {
                        onError && dispatch(onError("Web Socket Error occured"))
                    }

                    socket.onmessage = (e) => {
                        const { data } = e;

                        try {
                            const parsedData = JSON.parse(data);

                            if (parsedData.message === "Invalid or missing token") {
                                refreshToken()
                                    .then(refreshData => {
                                        const wssUrl = new URL(url);
                                        wssUrl.searchParams.set(
                                            "token",
                                            refreshData.accessToken.replace("Bearer ", "")
                                        );
                                        dispatch(connect(wssUrl.toString()))
                                    })
                                    .catch(err => {
                                        onError && dispatch(onError((err as Error).message))
                                    })
                                dispatch(disconnect());
                                return
                            }

                            onMessage && dispatch(onMessage(parsedData))
                        } catch (err) {
                            onError && dispatch(onError((err as Error).message))
                        }
                    }
                    socket.onclose = () => {
                        if (isConnected) {
                            reconnectTimer = window.setTimeout(() => {
                                dispatch(connect(url));
                            }, RECONNECT_PERIOD)
                        }
                    }
                }

                if (socket && disconnect.match(action)) {
                    clearTimeout(reconnectTimer)
                    reconnectTimer = 0;
                    isConnected = false;
                    socket.close();
                    socket = null;
                }

                next(action)
            }
        }
    }
}
