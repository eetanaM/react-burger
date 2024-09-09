import { IIngredient } from "./type";

interface IRequest {
    success: boolean;
}

interface IGetIngredients extends IRequest {
    data: IIngredient[];
}

interface IGetOrderData extends IRequest {
    name: string;
    order: {
        ingredients: IGetIngredients[];
        _id: string;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        };
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
    }
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
    IPasswordReset,
    IAuthResponse,
    IRefreshToken,
    ILogoutUser,
    IGetUserData,
}
