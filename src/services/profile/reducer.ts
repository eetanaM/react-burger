import { createSlice } from '@reduxjs/toolkit'

import { UserDataState } from '../../utils/type'
import { configureUser, getUser, loginUser, logoutUser, registerUser } from './actions'
import { configure } from '@testing-library/react'

const initialState: UserDataState = {
    user: {
        email: null,
        name: null,
    },
    isUserAuthenticated: false,
    authError: null,
    loading: false
}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        resetUser: (state) => {
            state = initialState
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.authError = null;
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isUserAuthenticated = true;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = { email: null, name: null };
                state.isUserAuthenticated = false;
                state.authError = action.error;
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.authError = null;
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isUserAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = { email: null, name: null };
                state.isUserAuthenticated = false;
                state.authError = action.error;
                state.loading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.authError = null;
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isUserAuthenticated = true;
                state.loading = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = { email: null, name: null };
                state.isUserAuthenticated = false;
                state.authError = action.error;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.authError = null;
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = initialState.user;
                state.isUserAuthenticated = false;
                state.loading = false;
            })
            .addCase(configureUser.pending, (state) => {
                state.authError = null;
                state.loading = true;
            })
            .addCase(configureUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(configureUser.rejected, (state, action) => {
                state.authError = action.error;
                state.loading = false;
            })

    },
    selectors: {
        getAuthData: state => state,
    }
})

export const { getAuthData } = profileSlice.selectors
