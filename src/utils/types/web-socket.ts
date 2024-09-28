import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export interface IOrder {
    ingredients: Array<string>;
    _id: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrdersResponse {
    success: boolean;
    orders: Array<IOrder>;
    total: number;
    totalToday: number;
}

export interface IOrdersState extends IOrdersResponse {
    connectionError: string | null;
}

export type TWsActionTypes<S, R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<S>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError?: ActionCreatorWithPayload<string>;
    onMessage?: ActionCreatorWithPayload<R>;
}
