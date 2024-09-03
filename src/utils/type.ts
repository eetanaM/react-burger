import { SerializedError } from "@reduxjs/toolkit";
// Структура ингредиента
interface IIngredient {
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
}

interface IDraggableIngredient extends IIngredient {
    key: string
}

// Интерфейс хранилища слайса ингредиентов
interface IIngredientsState {
    ingredients: IIngredient[] | [];
    loading: boolean;
    error: SerializedError | null;
}

// Интерфейс хранилища слайса конструктора ингредиентов
interface IIngredientsConstructorState {
    fillerToOrder: IDraggableIngredient[];
    bunsToOrder: IDraggableIngredient[];
}

// Интерфейс хранилища слайса информации о заказе
interface IOrderDetailsState {
    order: {
        number: number;
    } | null;
    success: boolean;
}

interface IIngredientCardProps<T> {
    ingredient: T;
    index?: number;
}

interface IModalProps {
    children?: React.JSX.Element;
    header?: string;
    onClose: () => void;
}

interface IConstructorOverlayProps {
    children: React.JSX.Element | React.JSX.Element[];
}

interface IUserDataState {
    user: {
        email: string | null;
        name: string | null;
    } | null;
    isAuthChecked: boolean;
    authError: SerializedError | null;
}

interface ILogin {
    email: string;
    password: string;
}

interface IRegister extends ILogin {
    userName: string;
}

interface IRefreshPassword {
    password: string;
    token: string;
}


export type {
    IIngredient,
    IDraggableIngredient,
    IIngredientsState,
    IIngredientsConstructorState,
    IOrderDetailsState,
    IIngredientCardProps,
    IModalProps,
    IConstructorOverlayProps,
    IUserDataState,
    ILogin,
    IRegister,
    IRefreshPassword,
};
