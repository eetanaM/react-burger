import { IIngredient } from "./type";

interface IRequest {
    success: boolean;
}

interface IGetIngredients extends IRequest {
    data: IIngredient[];
}

interface IGetOrderData extends IRequest {
    order: {
        ingredients: IIngredient[];
        _id: string;
        status: string;
        name: string;
        createdAt: string;
        number: number;
    }
}

interface IGetCurrentOrderData extends IRequest {
    orders: {
        ingredients: Array<string>;
        _id: string;
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
    }[]
}

interface IPasswordReset extends IRequest {
    message: string
}

interface IAuthResponse extends IRequest {
    user: {
        email: string;
        name: string
    };
    accessToken: string;
    refreshToken: string;
}

interface IRefreshToken extends IRequest {
    accessToken: string;
    refreshToken: string;
}

interface ILogoutUser extends IRequest {
    message: string;
}

interface IGetUserData extends IRequest {
    user: {
        email: string;
        name: string;
    }
}

export type {
    IRequest,
    IGetIngredients,
    IGetOrderData,
    IGetCurrentOrderData,
    IPasswordReset,
    IAuthResponse,
    IRefreshToken,
    ILogoutUser,
    IGetUserData,
}
