import done from '../../images/done.svg'

import { useAppSelector } from '../../hooks/preTypedHooks';

import { getOrder } from '../../services/order-details/reducer';

export default function OrderDetails() {
    const order = useAppSelector(getOrder)

    return (
        <>
            <h2 className="text text_type_digits-large mb-8">{order.number}</h2>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img src={done} alt="done icon" className="mb-15"/>
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</span>
        </>
    )
}
