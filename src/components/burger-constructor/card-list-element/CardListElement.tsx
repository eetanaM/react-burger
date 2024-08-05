import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { IngredientCardProps } from "../../../utils/type";
import styles from "./CardListElement.module.css"

export default function CardListElement({ingredient}:IngredientCardProps) {
    const [, dragRef] = useDrag({
        type: 'constructor-ingredient',
        item: {key: ingredient.key},
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })


    return (
        <li className={`${styles.list_element} mb-4`} key={ingredient.key} ref={dragRef}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
            />
        </li>
    )
}
