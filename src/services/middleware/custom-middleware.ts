
export const customMiddleware: () => (store: any) => (next: any) => (action: any) => void
= () => {
    return store => {
        return next => {
            return action => {
                if (action.type === "burger-constructor/addIngredientToOrder"
                && action.payload.type === "bun") {
                    if(store.getState()["burger-constructor"].bunsToOrder.length > 0) {
                        const id = store.getState()["burger-constructor"].bunsToOrder[0]._id;
                        store.dispatch({
                            type: "burger-ingredients/decrementCount",
                            payload: { id: id },
                        })
                    }
                }
                next(action);
            }
        }
    }
}
