import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { useAppDispatch } from '../../hooks/preTypedHooks';

import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

import { loadIngredients } from '../../services/burger-ingredients/reducer';
import Modal from '../modal/Modal';

export default function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  let state = location.state as { backgroundLocation?: Location}


  React.useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='forgot-password' element={<ForgotPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='ingredients/:id' element={<IngredientPage />} />
        <Route path='*' element={<NotFoundPage />} />
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
