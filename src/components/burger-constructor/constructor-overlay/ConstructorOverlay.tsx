import { useAppDispatch, useAppSelector } from '../../../hooks/preTypedHooks';
import { useMemo, useCallback } from 'react';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/Modal'
import OrderDetails from '../../order-details/OrderDetails'

import { getAllIngredientsToOrder} from "../../../services/burger-constructor/reducer";
import { loadOrder, getOrder } from '../../../services/order-details/reducer';

import { ConstructorOverlayProps } from '../../../utils/type'

import styles from './ConstructorOverlay.module.css'

export default function ConstructorOverlay ({children}: ConstructorOverlayProps) {
    const { fillerToOrder, bunsToOrder } = useAppSelector(getAllIngredientsToOrder)
    const order = useAppSelector(getOrder)

    const dispatch = useAppDispatch();

    const totalPrice = useMemo(() => {
        const result = fillerToOrder.reduce((acc, current) => acc + current.price, 0) + bunsToOrder.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [fillerToOrder, bunsToOrder])

    const ingredientsToOrder = useMemo(() => {
        if (fillerToOrder.length === 0 && bunsToOrder.length === 0) return [];
        if (fillerToOrder.length === 0 && bunsToOrder.length > 0) {
            return [bunsToOrder[0]._id, bunsToOrder[1]._id];
        }

        const result = [bunsToOrder[0]._id, ...fillerToOrder.map(item => item._id), bunsToOrder[1]._id];
        return result;
    }, [fillerToOrder, bunsToOrder]);

    const getOrderInfo = useCallback(() => {
        dispatch(loadOrder(ingredientsToOrder))
    }, [dispatch, ingredientsToOrder]);

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
                    onClick={getOrderInfo}
                    {...(bunsToOrder.length === 0 && {disabled: true})}
                >
                    Оформить заказ
                </Button>
            </div>
            {order.number &&
            <Modal>
                <OrderDetails orderId={order.number}/>
            </Modal>
            }
        </section>
    )
}
