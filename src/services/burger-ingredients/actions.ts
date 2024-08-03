const SERVER_URL: string = "https://norma.nomoreparties.space/api/ingredients1"

export const getIngredients = async () => {
    try {
        const res = await fetch(SERVER_URL)
        if (!res.ok) {
            throw new Error("Request error occured!")
        }
        const ingredients = await res.json()
        return ingredients.data
    } catch (error:any) {
        throw new Error(error.message)
    }
}
