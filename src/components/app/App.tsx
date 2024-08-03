import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients, getAllIngredients } from '../../services/burger-ingredients/reducer';


export default function App() {
  const { ingredients, loading, error } = useSelector(getAllIngredients)
  const dispatch = useDispatch()


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
        <main className={styles.main_container}>
          <BurgerIngredients ingredients={ingredients}/>
          <BurgerConstructor ingredients={ingredients}/>
        </main> : null
      }
    </>
  );
}
