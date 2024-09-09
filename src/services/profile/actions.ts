import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    registerUser as registerAPI,
    loginUser as loginAPI,
    logoutUser as logoutAPI,
    getUserData as getUserDataAPI,
    configureUserData as configureUserDataAPI,
} from "../../utils/api"

import { ILogin, IRegister } from "../../utils/types/type";

export const registerUser = createAsyncThunk(
    "profile/registerUser",
    async (user: IRegister) => {
        return registerAPI(user.email, user.password, user.userName)
    }
)

export const loginUser = createAsyncThunk(
    "profile/loginUser",
    async (user: ILogin) => {
        return loginAPI(user.email, user.password)
    }
)

export const getUser = createAsyncThunk("profile/getUser", getUserDataAPI)

export const logoutUser = createAsyncThunk("profile/logoutUser", logoutAPI)

export const configureUser = createAsyncThunk(
    "profile/configureUser",
    async (user: IRegister) => {
        return configureUserDataAPI(user.email, user.password, user.userName)
    }
)
