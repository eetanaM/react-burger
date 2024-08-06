import React, {memo} from 'react'
import { useSelector } from "react-redux";
import { useModal } from '../../../hooks/useModal'

import styles from './ConstructorOverlay.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/Modal'
import OrderDetails from '../../order-details/OrderDetails'

import { getAllIngredientsToOrder } from "../../../services/burger-constructor/reducer";

import { ConstructorOverlayProps, IngredientsToOrderState } from '../../../utils/type'

export default function ConstructorOverlay ({children}: ConstructorOverlayProps) {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [orderId] = React.useState('034536');
    const { fillerToOrder, bunsToOrder }: IngredientsToOrderState = useSelector(getAllIngredientsToOrder);

    const totalPrice = fillerToOrder.reduce((acc, current) => acc + current.price, 0) + bunsToOrder.reduce((acc, current) => acc + current.price, 0);

    return (
        <section className={`${styles.burger_constructor_container} pt-25 pl-4 ml-10`}>
            <div className={`${styles.burger_constructor_ingredients_container} ml-8 mb-10`}>
                {children}
            </div>
            <div className={`${styles.order_info} mr-4`}>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">
                        {totalPrice}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={openModal}
                    {...(bunsToOrder.length === 0 && {disabled: true})}
                >
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen &&
            <Modal onModalClose={closeModal}>
                <OrderDetails orderId={orderId}/>
            </Modal>
            }
        </section>
    )
}
