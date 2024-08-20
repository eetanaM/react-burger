import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks/preTypedHooks';

import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

import { getAllIngredients } from '../../services/burger-ingredients/reducer';

import styles from './HomePage.module.css'


export default function HomePage() {
  const { ingredients, loading, error } = useAppSelector(getAllIngredients)

  if (loading) {
    return (
      <>
        <h1 className="text text_type_main-large">Загрузка...</h1>
      </>
    )
  }

  if (!loading && error) {
    return (
      <>
        <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
      </>
    )
  }

  return (
    <>
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
