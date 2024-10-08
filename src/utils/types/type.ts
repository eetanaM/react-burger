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

// Интерфейс хранилища слайса конструктора ингредиентов
interface IIngredientsConstructorState {
    fillerToOrder: IDraggableIngredient[];
    bunsToOrder: IDraggableIngredient[];
}

// Интерфейс хранилища слайса информации о заказе
interface IOrderDetailsState {
    order: {
        ingredients: IIngredient[];
        number: number;
        status: string;
        name: string;
        _id: string;
        createdAt: string;
    } | null;
    success: boolean;
    error: SerializedError | null;
}

// Интерфейс пропсов карточки ингредиента в BurgerIngredients компоненте
interface IIngredientCardProps<T> {
    ingredient: T;
    index: number;
}

// Интерфейс пропсов модального окна
interface IModalProps {
    children?: React.JSX.Element;
    onClose: () => void;
}

// Интерфейс пропсов обёртки защищенного маршрута
interface IProtectedRouteElementProps {
    onlyUnAuth?: boolean;
    element: React.JSX.Element;
}

// Интерфейс пропсов оверлея конструктора
interface IConstructorOverlayProps {
    children: React.JSX.Element | React.JSX.Element[];
}

interface IOrderCardProps {
    ingredientsIds: Array<string>,
    orderCreatedAt: string,
    orderName: string,
    orderNumber: number,
    orderStatus: string,
    orderId: string
}

// Интерфейс пропсов иконки ингредиента
interface IIngredientIconProps {
    image: string;
    restAmount?: number
}

// Интерфейс хранилища слайса ингредиентов
interface IIngredientsState {
    ingredients: IIngredient[] | [];
    loading: boolean;
    error: SerializedError | null;
}

// Интерфейс хранилища слайса профиля пользователя
interface IUserDataState {
    user: {
        email: string | null;
        name: string | null;
    } | null;
    isAuthChecked: boolean;
    authError: SerializedError | null;
}

// Интерфейс данных для формы авторизации пользователя
interface ILogin {
    email: string;
    password: string;
}

// Интерфейс данных для формы регистрации пользователя
interface IRegister extends ILogin {
    userName: string;
}

// Интерфейс данных для формы сброса пароля
interface IRefreshPassword {
    password: string;
    token: string;
}

// Интерфейс данных перетаскиваемого элемента для хуков useDrag и useDrop
interface IDragItem {
    key: string;
    index: number;
}

export type {
    IIngredient,
    IDraggableIngredient,
    IIngredientsConstructorState,
    IOrderDetailsState,
    IIngredientCardProps,
    IModalProps,
    IProtectedRouteElementProps,
    IConstructorOverlayProps,
    IOrderCardProps,
    IIngredientIconProps,
    IIngredientsState,
    IUserDataState,
    ILogin,
    IRegister,
    IRefreshPassword,
    IDragItem
};
