import { useAppDispatch, useAppSelector } from '../../../hooks/preTypedHooks';
import { FC, FunctionComponent, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { getAllIngredientsToOrder} from "../../../services/burger-constructor/reducer";
import { getUserInfo } from '../../../services/profile/reducer';

import { IConstructorOverlayProps } from '../../../utils/type'

import styles from './ConstructorOverlay.module.css'

const ConstructorOverlay = ({ children }: IConstructorOverlayProps): React.JSX.Element => {
    const { fillerToOrder, bunsToOrder } = useAppSelector(getAllIngredientsToOrder);
    const user = useAppSelector(getUserInfo)
    const location = useLocation();
    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        const result = fillerToOrder.reduce((acc, current) => acc + current.price, 0) + bunsToOrder.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [fillerToOrder, bunsToOrder])

    const getOrderInfo = () => {
        if (!user) {
            navigate('/login', { state: { previousLocation: location } })
            return
        }
        navigate('/order', { state: { backgroundLocation: location, type: "order" }});
    };

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
        </section>
    )
}

export default ConstructorOverlay
