import { useParams } from 'react-router'
import { useAppSelector } from '../../hooks/preTypedHooks'

import IngredientDetails from '../../components/ingredient-details/IngredientDetails'

import { getIngredinetsState } from '../../services/burger-ingredients/slice'

const IngredientPage = (): React.JSX.Element => {

    const { id } = useParams<"id">()

    const { ingredients } = useAppSelector(getIngredinetsState);

    const currentIngredient = ingredients.find(ingredient => ingredient._id === id);

    return (
        <>
            {currentIngredient &&
                <IngredientDetails />
            }
        </>
    )
}

export default IngredientPage
