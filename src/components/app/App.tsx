import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { useAppDispatch } from '../../hooks/preTypedHooks';

import ProtectedRouteElement from '../protected-route-element/ProtectedRouteElement';

import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, OrdersPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

import Modal from '../modal/Modal';
import Layout from '../layout/Layout';

import { loadIngredients } from '../../services/burger-ingredients/actions';
import { getUser } from '../../services/profile/actions';

import ProfilePageLayout from '../profile-page-layout/ProfilePageLayout';

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location}

  React.useEffect(() => {
    dispatch(getUser())
    dispatch(loadIngredients())
  }, []);

return (
    <>
    <Routes location={state?.backgroundLocation || location}>
      <Route path='/' element={<Layout />} >
        <Route index={true} element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='forgot-password' element={<ForgotPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route
          path='profile'
          element={<ProtectedRouteElement element={<ProfilePageLayout />} />}
        >
          <Route index={true} element={<ProfilePage />} />
          <Route path='orders' element={<OrdersPage />} />
          <Route path='orders/:id' element={<NotFoundPage />} />
        </Route>
        <Route />
        <Route path='ingredients/:id' element={<IngredientPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>

    {state?.backgroundLocation && (
      <Routes>
        <Route path='/ingredients/:id' element={<Modal />} />
        <Route path='/order' element={<Modal />} />
      </Routes>
    )}
    </>
  );
}
