import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks/preTypedHooks';

import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

import { getAllIngredients } from '../../services/burger-ingredients/slice';

import styles from './HomePage.module.css'
import Preloader from '../../components/preloader/Preloader';


const HomePage = (): React.JSX.Element => {
  const { ingredients, loading, error } = useAppSelector(getAllIngredients)

  if (loading) {
    return (
      <>
        <div className={styles.loading_container}>
          <h1 className="text text_type_main-large"> Загрузка... </h1>
          <Preloader />
        </div>
      </>
    )
  }

  if (!loading && error) {
    return (
      <>
        <div className={styles.loading_container}>
          <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
        </div>
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

export default HomePage
