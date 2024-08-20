import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    registerUser as registerAPI,
    loginUser as loginAPI,
    logoutUser as logoutAPI,
    getUserData as getUserDataAPI,
    configureUserData as configureUserDataAPI,
} from "../../utils/api"

import { Login, Register } from "../../utils/type";

export const registerUser = createAsyncThunk(
    "profile/registerUser",
    async (user: Register) => {
        return registerAPI(user.email, user.password, user.userName)
    }
)

export const loginUser = createAsyncThunk(
    "profile/loginUser",
    async (user: Login) => {
        return loginAPI(user.email, user.password)
    }
)

export const getUser = createAsyncThunk(
    "profile/getUser",
    async () => {
        return await getUserDataAPI()
    }
)

export const logoutUser = createAsyncThunk(
    "profile/logoutUser",
    async () => {
        return logoutAPI()
    }
)

export const configureUser = createAsyncThunk(
    "profile/configureUser",
    async (user: Register) => {
        return configureUserDataAPI(user.email, user.password, user.userName)
    }
)
