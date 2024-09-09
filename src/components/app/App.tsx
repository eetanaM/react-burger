import React, { useCallback } from 'react';
import { Location, Route, Routes, useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/preTypedHooks';

import { OnlyAuth, OnlyUnAuth } from '../protected-route-element/ProtectedRouteElement';

import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, OrdersPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

import Modal from '../modal/Modal';
import Layout from '../layout/Layout';

import { loadIngredients } from '../../services/burger-ingredients/actions';
import { getUser } from '../../services/profile/actions';

import ProfilePageLayout from '../profile-page-layout/ProfilePageLayout';
import OrderDetails from '../order-details/OrderDetails';
import IngredientDetails from '../ingredient-details/IngredientDetails';

const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation() as Location<{ backgroundLocation: Location }>;
  const navigate = useNavigate();
  const state = location.state;

  const hideModal = useCallback((dispatchType: string) => {
    navigate(-1)
    dispatch({
      type: dispatchType
    })
  }, [dispatch])

  React.useEffect(() => {
    dispatch(getUser())
    dispatch(loadIngredients())
  }, []);

return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Layout />} >
          <Route index={true} element={<HomePage />} />
          <Route path='login' element={<OnlyUnAuth element={<LoginPage />} />} />
          <Route path='register' element={<OnlyUnAuth element={<RegisterPage />} />} />
          <Route path='forgot-password' element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />
          <Route path='profile' element={<OnlyAuth element={<ProfilePageLayout />} />} >
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
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                header="Детали ингредиента"
                onClose={() => hideModal('ingredient-details/hideIngredient')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/order'
            element={
              <Modal
                onClose={() => hideModal('order-details/hideOrder')}
              >
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      </>
  );
}

export default App
