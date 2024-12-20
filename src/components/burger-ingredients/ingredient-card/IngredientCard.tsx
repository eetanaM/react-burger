import React, { useCallback } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { Location, useLocation, useNavigate } from "react-router";

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient, IIngredientCardProps } from "../../../utils/types/type";

import styles from "./IngredientCard.module.css"

const IngredientCard = ({ ingredient }: Pick<IIngredientCardProps<IIngredient>, 'ingredient'>): React.JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation() as Location<{ backgroundLocation: Location }>;
    const [, dragRef, preview] = useDrag<{ id: string }, unknown, unknown>({
        type: 'ingredient',
        item: {id: ingredient._id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const openModal = useCallback((ingredient: IIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location }})
    }, [])

    return (
        <>
            <DragPreviewImage connect={preview} src={ingredient.image}/>
            <div className={styles.ingredient_card_container} key={ingredient._id} ref={dragRef}>
                <div
                    className={styles.ingredient_card_details}
                    onClick={() => openModal(ingredient)}
                    data-testid={`${ingredient.type}_test_element_${ingredient._id}`}
                >
                    <img src={ingredient.image} alt={`${ingredient.name} preview`} className="ml-4 mr-4" />
                    <div className={`${styles.currency}`}>
                        <span className="text text_type_main-default">{ingredient.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <span className="text text_type_main-default">{ingredient.name}</span>
                </div>
                <div className={styles.counter} style={ingredient.counter === 0 ? {display: "none"} : {}}>
                    <Counter count={ingredient.counter} size="default" extraClass="m-1"/>
                </div>
            </div>
        </>
    )
}

export default React.memo(IngredientCard)
