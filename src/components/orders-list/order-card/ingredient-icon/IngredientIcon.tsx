import { IIngredient } from "../../../../utils/types/type"

import styles from "./IngredientIcon.module.css"

const IngredientIcon = ({ ingredient }: {ingredient: IIngredient}): React.JSX.Element => {
    return (
        <li className={styles.icon_layout}>
            <div className={styles.ingredient_icon}>
                <img src={ingredient.image_mobile} alt={ingredient.name} />
            </div>
        </li>
    )
}

export default IngredientIcon
