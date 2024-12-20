import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/preTypedHooks';

import done from '../../images/done.svg'

import Preloader from '../preloader/Preloader';

import { getOrderInfo } from '../../services/order-details/slice';
import { getAllIngredientsToOrder } from '../../services/burger-constructor/slice';
import { loadOrder } from '../../services/order-details/action';

import styles from './OrderDetails.module.css'

const OrderDetails = (): React.JSX.Element => {
    const { order, success, error } = useAppSelector(getOrderInfo)
    const { fillerToOrder, bunsToOrder } = useAppSelector(getAllIngredientsToOrder);
    const dispatch = useAppDispatch()

    const ingredientsToOrder = useMemo(() => {
        if (fillerToOrder.length === 0 && bunsToOrder.length === 0) return [];
        if (fillerToOrder.length === 0 && bunsToOrder.length > 0) {
            return [bunsToOrder[0]._id, bunsToOrder[1]._id];
        }
        if (bunsToOrder.length === 0 && fillerToOrder.length > 0) {
            return [...fillerToOrder.map(item => item._id)];
        }

        const result = [bunsToOrder[0]._id, ...fillerToOrder.map(item => item._id), bunsToOrder[1]._id];
        return result;
    }, [fillerToOrder, bunsToOrder]);


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        dispatch(loadOrder({ ingredients: ingredientsToOrder, signal }))
        return () => {
            abortController.abort()
        }
    }, [])

    if (!success && !error) return (
        <div className={styles.content_container}>
            <span className="text text_type_main-medium">
                Дождитесь окончания оформления заказа...
            </span>
            <Preloader />
        </div>
    )

    if (!success && error) return (
        <div className={styles.content_container}>
            <span className="text text_type_main-medium">
                Произошла ошибка. Попробуйте снова
            </span>
        </div>
    )

    if (success) return (
        <>
            <h2
                className="text text_type_digits-large mt-30 mb-8"
                data-testid="order_details_number_test_element"
            >{order?.number}</h2>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img src={done} alt="done icon" className="mb-15"/>
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</span>
        </>
    )

    return (
        <div>
            <span className="text text_type_main-medium">
                Что-то пошло не так...
            </span>
        </div>
    )
}

export default OrderDetails
