import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../hooks/preTypedHooks';

import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import { loadIngredients, getAllIngredients } from '../../services/burger-ingredients/reducer';

import styles from './App.module.css';

export default function App() {
  const { ingredients, loading, error } = useAppSelector(getAllIngredients)
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <AppHeader />
        <h1 className="text text_type_main-large">Загрузка...</h1>
      </>
    )
  }

  if (!loading && error) {
    return (
      <>
        <AppHeader />
        <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
      </>
    )
  }

  return (
    <>
      <AppHeader />
      {ingredients && ingredients.length > 0 ?
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main_container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider> : null
      }
    </>
  );
}
