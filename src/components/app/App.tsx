import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const SERVER_URL = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [ingredientsDetails, setIngredientsDetails] = React.useState([])
  const [loading, setLoading]:any = React.useState<boolean>(false)
  const [error, setError] = React.useState<any>('')


  React.useEffect(() => {
    try {
      setError(null);
      setLoading(true);

      fetch(SERVER_URL)
        .then(res => res.json())
        .then(data => setIngredientsDetails(data.data))

      setLoading(false);
    }
    catch(error) {
      setError(error);
      setLoading(false);
    }
  }, [error]);

  if (loading) {
    return (
      <h1 className="text text_type_main-large">Загрузка...</h1>
    )
  }

  if (error) {
    return (
      <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
    )
  }

  return (
    <>
      <AppHeader />
      {ingredientsDetails && ingredientsDetails.length > 0 ?
        <main className={styles.main_container}>
          <BurgerIngredients ingredientsDetails={ingredientsDetails}/>
          <BurgerConstructor ingredientsDetails={ingredientsDetails}/>
        </main> : null
      }
    </>
  );
}

export default App;
