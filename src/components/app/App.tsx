import { Route } from 'react-router';
import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

export default function App() {

  return (
    <>
      <Route path='/'element={<HomePage />} />
      <Route path='/login'element={<LoginPage />} />
      <Route path='/register'element={<RegisterPage />} />
      <Route path='/forgot-password'element={<ForgotPasswordPage />} />
      <Route path='/reset-password'element={<ResetPasswordPage />} />
      <Route path='/profile'element={<ProfilePage />} />
      <Route path='/ingredients/:id'element={<IngredientPage />} />
      <Route path='/*'element={<NotFoundPage />} />
    </>
  );
}
