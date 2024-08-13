import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage } from './pages';

import { store } from './services/store';

import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/'element={<HomePage />} />
          <Route path='/login'element={<LoginPage />} />
          <Route path='/register'element={<RegisterPage />} />
          <Route path='/forgot-password'element={<ForgotPasswordPage />} />
          <Route path='/reset-password'element={<ResetPasswordPage />} />
          <Route path='/profile'element={<ProfilePage />} />
          <Route path='/ingredients/:id'element={<IngredientPage />} />
          <Route path='/*'element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
