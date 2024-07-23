import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const SERVER_URL = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [ingredientsDetails, setIngredientsDetails] = React.useState([])


  React.useEffect(() => {
    try {
      fetch(SERVER_URL)
        .then(res => res.json())
        .then(data => setIngredientsDetails(data.data))
    }
    catch(e) {
      console.log("Ошибка запроса на сервер")
    }
  }, []);
  return (
    <>
      <AppHeader />
      {ingredientsDetails.length > 0 &&
        <main className={styles.main_container}>
          <BurgerIngredients ingredientsDetails={ingredientsDetails}/>
          <BurgerConstructor ingredientsDetails={ingredientsDetails}/>
        </main>
      }
    </>
  );
}

export default App;
