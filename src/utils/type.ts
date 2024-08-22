import { SerializedError } from "@reduxjs/toolkit";
// Структура ингредиента
type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins:number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    counter: number;
    key?: string;
}

interface IngredientsState {
    ingredients: Ingredient[] | [],
    loading: boolean,
    error: SerializedError | null
}

interface IngredientsConstructorState {
    fillerToOrder: Ingredient[],
    bunsToOrder: Ingredient[],
}

interface IngredientDetailsState {
    currentIngredient: Ingredient | null,
}

interface OrderDetailsState {
    order: {
        number: number,
    } | null,
    success: boolean
}

interface IngredientCardProps {
    ingredient: Ingredient;
    onModalOpen?: (id:string) => void;
    index?: number;
}

interface ModalProps {
    children?: React.ReactNode,
    header?: string,
    hideModal?: () => void,
}

interface ConstructorOverlayProps {
    children?: React.ReactNode,
}

interface OrderDetailsProps {
    orderId: number,
}

interface UserDataState {
    user: {
        email: string | null,
        name: string | null,
    } | null
    isAuthChecked: boolean,
    authError: SerializedError | null,
}

interface Login {
    email: string;
    password: string;
}

interface Register extends Login {
    userName: string
}


export type {
    Ingredient,
    IngredientsState,
    IngredientsConstructorState,
    IngredientDetailsState,
    OrderDetailsState,
    IngredientCardProps,
    ModalProps,
    ConstructorOverlayProps,
    OrderDetailsProps,
    UserDataState,
    Login,
    Register,
};
