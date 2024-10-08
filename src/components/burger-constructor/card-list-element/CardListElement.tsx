import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from '../../../hooks/preTypedHooks';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { moveIngredient, removeIngredientFromOrder } from '../../../services/burger-constructor/slice';
import { decrementCount } from '../../../services/burger-ingredients/slice';

import { IDraggableIngredient, IIngredientCardProps, IDragItem } from "../../../utils/types/type";
import { Identifier } from 'dnd-core';

import styles from "./CardListElement.module.css"

const CardListElement = ({ingredient, index}: IIngredientCardProps<IDraggableIngredient>): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const handleIngredientMove = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient({ dragIndex, hoverIndex }))
    }

    const [, dragRef] = useDrag<IDragItem, unknown, unknown>({
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

    const [, dropRef] = useDrop<IDragItem, unknown, { handlerId: Identifier | null }>({
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

            if (!clientOffset) {
                return
            }

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            handleIngredientMove(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    dragRef(dropRef(ref))

    const handleIngredientRemove = useCallback(() => {
        dispatch(removeIngredientFromOrder({ id: ingredient.key }));
        dispatch(decrementCount({ id: ingredient._id }))
    }, [dispatch])


    return (
        <li className={`${styles.list_element} mb-4`} key={ingredient.key} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleIngredientRemove}
            />
        </li>
    )
}

export default CardListElement
