import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const SERVER_URL: string = "https://norma.nomoreparties.space/api/ingredients"

export default function App() {
  const [ingredients, setIngredients] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')


  React.useEffect(() => {
      setError('');
      setLoading(true);

      fetch(SERVER_URL)
        .then(res => {
          if (!res.ok) {
            throw new Error("Request error occured!")
          }
          return res.json()}
        )
        .then(ingredients => setIngredients(ingredients.data))
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        })
        .finally(() => {
            setLoading(false);
          }
        )
  }, []);

  if (loading) {
    return (
      <>
        <AppHeader />
      <h1 className="text text_type_main-large">Загрузка...</h1>
      </>
    )
  }

  if (error) {
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
