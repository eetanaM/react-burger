import { Middleware } from "redux";
import { RootState } from "../store";

const customMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {

    if (action?.type === "burger-constructor/addIngredientToOrder" &&
    action?.payload.type === "bun") {
        if(store.getState()["burger-constructor"].bunsToOrder.length > 0) {
            const id = store.getState()["burger-constructor"].bunsToOrder[0]._id;
            store.dispatch({
                type: "burger-ingredients/decrementCount",
                payload: { id: id },
            })
        }
    }

    return next(action);
}

export default customMiddleware
