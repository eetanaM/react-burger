import { Middleware, UnknownAction } from "redux";
import { isAnyOf } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { addIngredientToOrder, clearIngredients } from "../burger-constructor/slice";
import { clearCounts, decrementCount } from "../burger-ingredients/slice";
import { resetUser } from "../profile/slice";

import { getUser, configureUser } from "../profile/actions";
import { loadOrder } from "../order-details/action";

import { getStoredToken, refreshToken } from "../../utils/api";

const customMiddleware: Middleware<{}, RootState> = store => next => action => {
    const { dispatch, getState } = store;
    const isRejectedAction = isAnyOf(getUser.rejected, configureUser.rejected, loadOrder.rejected);

    // Перехватываются экшены, добавляющие булки в конструктор, и удаляются добавленные ранее булки
    if (addIngredientToOrder.match(action) && action.payload.type === "bun") {
        if(getState()["burger-constructor"].bunsToOrder.length > 0) {
            const id = getState()["burger-constructor"].bunsToOrder[0]._id;
            dispatch(decrementCount({ id: id }))
        }
    }

    // Перехватывается экшен при успешном заказе и очищаются добавленные в конструктор ингредиенты и обнуляются счётчики в списке ингредиентов
    if (loadOrder.fulfilled.match(action)) {
        dispatch<UnknownAction>(clearIngredients())
        dispatch<UnknownAction>(clearCounts())
    }

    // Перехватываются отклоненные запросы с истёкшим временем жизни токена доступа для обновления токена и повторного запроса при наличии рефреш токена

    if (isRejectedAction(action)) {
        const refreshWithStoredToken = async () => {
            try {
                const newAccessToken = (await refreshToken()).accessToken;
                if(newAccessToken) {
                    if (getUser.rejected.match(action)) {
                        dispatch<any>(getUser())
                    }
                    if (configureUser.rejected.match(action) || loadOrder.rejected.match(action)) {
                        if (configureUser.rejected.match(action)) {
                            const { arg } = action.meta
                            dispatch<any>(configureUser(arg))
                        }
                        if (loadOrder.rejected.match(action)) {
                            const { arg } = action.meta
                            dispatch<any>(loadOrder(arg))
                        }
                    }
                    }
            } catch (e) {
                console.log('Failed to refresh token')
                dispatch<any>(resetUser())
            }
        }

        if (action.error.message === "jwt expired") {
            console.log("Refreshing token")
            const storedRefreshToken = getStoredToken('refreshToken')
            if (storedRefreshToken) {
               refreshWithStoredToken()
            }
        }
    }



    return next(action);
}

export default customMiddleware
