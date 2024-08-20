import { Middleware } from "redux";
import { RootState } from "../store";
import { getStoredToken, refreshToken } from "../../utils/api";
import { getUser } from "../profile/actions";

const customMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
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
    if (action.type === ('profile/getUser/rejected' || 'profile/configureUser/rejected') && action.error.message === "403") {
        const storedRefreshToken = getStoredToken('refreshToken')
        if (storedRefreshToken) {
            (async (storedRefreshToken: string) => {
                try {
                    const newAccessToken = (await refreshToken(storedRefreshToken)).accessToken;
                    if(newAccessToken) {
                        store.dispatch<any>(getUser())
                    }
                } catch (e) {
                  console.log('Failed to refresh token')
                  store.dispatch({type: 'profile/resetUser'})
                }
            })(storedRefreshToken)
        }
    }
    return next(action);
}

export default customMiddleware
