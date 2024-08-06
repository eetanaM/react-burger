import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientCardProps, Ingredient } from "../../../utils/type";

import styles from "./CardListElement.module.css"

export default function CardListElement({ingredient, index}:IngredientCardProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: 'burger-constructor/moveIngredient',
            payload: { dragIndex, hoverIndex },
        })
    }, [])

    const [, dragRef] = useDrag({
        type: 'constructor-ingredient',
        item: () => ({
            key: ingredient.key,
            index: index
        }),
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })

    const [{ handlerId }, dropRef] = useDrop<{key: string, index:number, type: string},void,{ handlerId: string | symbol | null }>({
        accept: 'constructor-ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) return;


            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === undefined || hoverIndex === undefined) return

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    dragRef(dropRef(ref))

    const removeHandler = () => {
        dispatch({
            type:"burger-constructor/removeIngredientFromOrder",
            payload: {
                id: ingredient.key
            }
        }
        )
    }


    return (
        <li className={`${styles.list_element} mb-4`} key={ingredient.key} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={removeHandler}
            />
        </li>
    )
}
