import done from '../../images/done.svg'

import { useAppSelector } from '../../hooks/preTypedHooks';

import Preloader from '../preloader/Preloader';

import { getOrderInfo } from '../../services/order-details/reducer';

import styles from './OrderDetails.module.css'

export default function OrderDetails() {
    const { order, success, loading } = useAppSelector(getOrderInfo)

    if (loading && !success) return (
        <div className={styles.content_container}>
            <span className="text text_type_main-medium">
                Дождитесь окончания оформления заказа...
            </span>
            <Preloader />
        </div>
    )

    if (!loading && success) return (
        <>
            <h2 className="text text_type_digits-large mb-8">{order.number}</h2>
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
