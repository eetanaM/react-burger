import { useParams } from 'react-router'
import { useAppSelector } from '../../hooks/preTypedHooks'

import AppHeader from '../../components/app-header/AppHeader'
import IngredientDetails from '../../components/ingredient-details/IngredientDetails'

import { getAllIngredients } from '../../services/burger-ingredients/reducer'

export default function IngredientPage() {

    const { id } = useParams<"id">()

    const { ingredients } = useAppSelector(getAllIngredients);

    const currentIngredient = ingredients.find(ingredient => ingredient._id === id);

    return (
        <>
            <AppHeader />
            {currentIngredient &&
                <IngredientDetails />
            }
        </>
    )
}
