import React from 'react';
import ingredientsDetails from '../../utils/data';
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main className="main_container">
        <BurgerIngredients ingredientsDetails={ingredientsDetails}/>
        <BurgerConstructor ingredientsDetails={ingredientsDetails}/>
      </main>
    </>
  );
}

export default App;
