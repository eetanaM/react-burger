import { createSlice } from '@reduxjs/toolkit'

import { IUserDataState } from '../../utils/types/type'
import { configureUser, getUser, loginUser, logoutUser, registerUser } from './actions'

export const initialState: IUserDataState = {
    user: null,
    isAuthChecked: false,
    authError: null,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        resetUser: state => {
            state = initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authError = null;
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null
                state.isAuthChecked = true;
                state.authError = action.error;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authError = null;
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null
                state.isAuthChecked = true;
                state.authError = action.error;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.authError = null;
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = null
                state.isAuthChecked = true;
                state.authError = action.error;
            })
            .addCase(logoutUser.fulfilled, () => ({...initialState, isAuthChecked: true}))
            .addCase(configureUser.fulfilled, (state, action) => {
                state.authError = null;
                state.user = action.payload.user;
            })
            .addCase(configureUser.rejected, (state, action) => {
                state.authError = action.error;
            })

    },
    selectors: {
        getUserInfo: state => state.user,
        getIsAuthChecked: state => state.isAuthChecked
    }
})

export const { resetUser } = profileSlice.actions;

export const { getUserInfo, getIsAuthChecked } = profileSlice.selectors;

export const profileReducer = profileSlice.reducer
