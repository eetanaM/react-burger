import { Middleware } from "redux";
import { RootState } from "../store";
import { getStoredToken, refreshToken } from "../../utils/api";
import { getUser, configureUser } from "../profile/actions";
import { loadOrder } from "../order-details/action";

const customMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
    // Перехватываются экшены, добавляющие булки в конструктор, и удаляются добавленные ранее булки
    if (action.type === "burger-constructor/addIngredientToOrder" &&
    action.payload.type === "bun") {
        if(store.getState()["burger-constructor"].bunsToOrder.length > 0) {
            const id = store.getState()["burger-constructor"].bunsToOrder[0]._id;
            store.dispatch({
                type: "burger-ingredients/decrementCount",
                payload: { id: id },
            })
        }
    }

    // Перехватывается экшен при успешном заказе и очищаются добавленные в конструктор ингредиенты и обнуляются счётчики в списке ингредиентов
    if (action.type === loadOrder.fulfilled.type) {
        store.dispatch({
            type: "burger-constructor/clearIngredients"
        })
        store.dispatch({
            type: "burger-ingredients/clearCounts"
        })
    }

    // Перехватываются отклоненные запросы с истёкшим временем жизни токена доступа для обновления токена и повторного запроса при наличии рефреш токена
    if ((action.type === getUser.rejected.type
        || action.type === configureUser.rejected.type
        || action.type === loadOrder.rejected.type)
        && action.error.message === "jwt expired") {
        console.log("Refreshing token")
        const storedRefreshToken = getStoredToken('refreshToken')
        const interceptedPayload = action.meta.arg;
        if (storedRefreshToken) {
            (async () => {
                try {
                    const newAccessToken = (await refreshToken()).accessToken;
                    if(newAccessToken) {
                        switch (action.type) {
                            case getUser.rejected.type: {
                                store.dispatch<any>(getUser())
                                break;
                            };
                            case configureUser.rejected.type: {
                                store.dispatch<any>(configureUser(interceptedPayload))
                                break;
                            };
                            case loadOrder.rejected.type: {
                                store.dispatch<any>(loadOrder(interceptedPayload))
                                break;
                            };
                        }
                    }
                } catch (e) {
                  console.log('Failed to refresh token')
                  store.dispatch({type: 'profile/resetUser'})
                }
            })()
        }
    }
    return next(action);
}

export default customMiddleware
