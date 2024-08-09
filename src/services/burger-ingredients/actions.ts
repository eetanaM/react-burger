import { SerializedError } from "@reduxjs/toolkit"

const SERVER_URL: string = "https://norma.nomoreparties.space/api/ingredients"

export const getIngredients = async () => {
    try {
        const res = await fetch(SERVER_URL)
        if (!res.ok) {
            throw new Error("Request error occured!")
        }
        const ingredients = await res.json()
        return ingredients.data
    } catch (error: any) {
        return error
    }
}
