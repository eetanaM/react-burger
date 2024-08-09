import { SerializedError } from "@reduxjs/toolkit";

const REQUEST_URL: string = "https://norma.nomoreparties.space/api/orders"

export const getOrderData = async (ingredientsToOrder: string[]) => {
    try {
        const res = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({ ingredients: ingredientsToOrder })
        })
        if (!res.ok) {
            throw new Error("Order request error occured!")
        }
        const order = await res.json();
        return order
    } catch (error: any) {
        return error
    }
}
