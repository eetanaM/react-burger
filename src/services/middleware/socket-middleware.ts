import { Middleware } from "redux"
import { TWsActionTypes } from "../../utils/types/web-socket"
import { RootState } from "../store"

const RECONNECT_PERIOD = 2000;

export const socketMiddleware = <S, R>(wsActions: TWsActionTypes<S, R>): Middleware<{}, RootState> => {

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
            onClose,
        } = wsActions

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
                            const parsedData = JSON.parse(data)
                            onMessage && dispatch(onMessage(parsedData))
                        } catch (err) {
                            onError && dispatch(onError((err as Error).message))
                        }
                    }
                    socket.onclose = () => {
                        onClose && dispatch(onClose())

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
