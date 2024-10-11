import { useAppSelector } from '../../../hooks/preTypedHooks';
import { useMemo } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { getAllIngredientsToOrder} from "../../../services/burger-constructor/slice";
import { getUserInfo } from '../../../services/profile/slice';

import { IConstructorOverlayProps } from '../../../utils/types/type'

import styles from './ConstructorOverlay.module.css'

const ConstructorOverlay = ({ children }: IConstructorOverlayProps): React.JSX.Element => {
    const { fillerToOrder, bunsToOrder } = useAppSelector(getAllIngredientsToOrder);
    const user = useAppSelector(getUserInfo)
    const location = useLocation() as Location<{ backgroundLocation: Location }>;
    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        const result = fillerToOrder.reduce((acc, current) => acc + current.price, 0) + bunsToOrder.reduce((acc, current) => acc + current.price, 0)
        return result;
    }, [fillerToOrder, bunsToOrder])

    const getOrderInfo = () => {
        if (!user) {
            navigate('/login', { state: { previousLocation: location }})
            return
        }
        navigate('/order', { state: { backgroundLocation: location }});
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
                    data-testid="order_button_test_element"
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default ConstructorOverlay
