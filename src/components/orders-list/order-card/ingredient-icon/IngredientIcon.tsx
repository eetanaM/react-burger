import { IIngredient, IIngredientIconProps } from "../../../../utils/types/type"

import styles from "./IngredientIcon.module.css"

const IngredientIcon = ({ image, restAmount }:  IIngredientIconProps): React.JSX.Element => {
    return (
        <li className={styles.icon_layout}>
            <div className={styles.ingredient_icon}>
                {!restAmount ? <img src={image} alt='ingredient icon'/>
                : <>
                    <img src={image} style={{ opacity: 0.3 }} alt='ingredient icon'/>
                    <p
                        className={`${styles.icon_cover_text} text text_type_main-default`}
                    >
                        +{restAmount}
                    </p>
                  </>
                }
            </div>
        </li>
    )
}

export default IngredientIcon
