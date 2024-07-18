import React from 'react';
import burgersDetails from '../../utils/data';
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

function App() {
  return (
    <>
      <AppHeader />
      <BurgerIngredients />
    </>
  );
}

export default App;
