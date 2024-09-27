import { useEffect, useState } from 'react'
import { useMatch, useParams } from 'react-router'
import { useAppSelector } from '../../hooks/preTypedHooks'

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientIcon from '../ingredient-icon/IngredientIcon'
import Preloader from '../preloader/Preloader'

import { getIngredinetsState } from '../../services/burger-ingredients/slice'
import { getOrders } from '../../services/feed/slice'
import { getProfileOrders } from '../../services/profile-feed/slice'

import { getCurrentOrderData } from '../../utils/api'

import { IIngredient, IOrderDetailsState } from '../../utils/types/type'

import styles from './FeedOrderDetails.module.css'

const FeedOrderDetails = (): React.JSX.Element => {
    const { number } = useParams();
    const orders = useAppSelector(getOrders);
    const profileOrders = useAppSelector(getProfileOrders)
    const { ingredients } = useAppSelector(getIngredinetsState)

    const [order, setOrder] = useState<IOrderDetailsState["order"]>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const isOnProfilePage = useMatch('profile/orders/:number')

    useEffect(() => {
        if (number && ingredients.length > 0) {
            // Ищем заказ в массиве заказов, полученных по web-socket
            let currentOrder = isOnProfilePage
            ? profileOrders.find(order => order.number === +number)
            : orders.find(order => order.number === +number);

            if (currentOrder) {
                const orderIngredients: IIngredient[] = [];
                currentOrder.ingredients.forEach(ingredientId => {
                    const currentIngredient = ingredients.find(ingredient => ingredient._id === ingredientId);
                    if (currentIngredient) {
                        orderIngredients.push(currentIngredient)
                    }
                })

                setOrder({...currentOrder, ingredients: orderIngredients})
                setIsLoading(false)
            } else {
            // Если в массиве заказа нет, загружаем заказ напрямую с эндпоинта
                getCurrentOrderData(number)
                .then(data => {
                    currentOrder = data.orders[0]
                    const orderIngredients: IIngredient[] = [];
                    if (currentOrder) {
                        currentOrder.ingredients.forEach(ingredientId => {
                            const currentIngredient = ingredients.find(ingredient => ingredient._id === ingredientId);
                            if (currentIngredient) {
                                orderIngredients.push(currentIngredient)
                            }
                        })
                        setOrder({...currentOrder, ingredients: orderIngredients})
                        setIsLoading(false)
                    } else {
                    // Если эндпоинт вернул пустой массив заказов
                        setError(new Error("Заказ не найден"))
                        setIsLoading(false)
                    }
                })
                .catch(err => {
                    setError(err)
                    setIsLoading(false)
                })
            }
        }
    }, [ingredients])

    if (isLoading) {
        return <Preloader />
    }

    if (!isLoading && error) {
        return (
            <div className={styles.order_details_container}>
                <h2 className='text text_type_main-large'>Что-то пошло не так</h2>
            </div>
        )
    }

    if (!order) {
        return (
            <div className={styles.order_details_container}>
                <h2 className='text text_type_main-large'>Заказ не найден</h2>
            </div>
        )
    }

    let statusTextColor;
    let statusText;
    switch (order.status) {
        case "done":
            statusTextColor = {color: "#00CCCC"};
            statusText = "Выполнен"
            break;
        case "in work":
            statusTextColor = {color: "#ffffff"};
            statusText = "Готовится"
            break;
        case "canceled":
            statusTextColor = {color: "#ce0c0c"};
            statusText = "Отменен"
            break;
        case "created":
            statusTextColor = {color: "#ffffff"};
            statusText = "Создан"
            break;
    }


    const totalPrice = order.ingredients.reduce((acc, current) => acc + current.price, 0);

    const filteredIngredients = Array.from(new Set(order.ingredients.map(el =>  JSON.stringify(el)))).map(el => JSON.parse(el) as IIngredient)

    const ingredientsToRender = filteredIngredients.map((ingredient) => {
        const ingredientsAmount = order.ingredients.filter((el) => {
            return el._id === ingredient._id
        })

        return <li key={ingredient._id} className="text text_type_main-default mb-4">
            <IngredientIcon image={ingredient.image}/>
            <span>{ingredient.name}</span>
            <div className={styles.price}>
                <span
                    className="text text_type_digits-default"
                >
                    {ingredientsAmount.length} x {ingredient.price}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
        </li>
    })

    return (
        <>
            <div className={styles.order_details_container}>
                <p
                    className={`${styles.order_details_number} text text_type_digits-default`}
                >{`#${order.number}`}</p>
                <p className="text text_type_main-medium mt-10">
                    {order.name}
                </p>
                <p
                    className="text text_type_main-default mt-3"
                    style={statusTextColor}
                >
                    {statusText}
                </p>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <ul className={`${styles.order_details_ingredients_list} mt-6 custom-scroll`}>
                    {ingredientsToRender}
                </ul>
                <div className={`${styles.order_details_footer} mt-10`}>
                    <span
                        className="text text_type_main-default text_color_inactive"
                    >
                        <FormattedDate date={new Date(order.createdAt)}/>
                    </span>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default">
                            {totalPrice}
                        </span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedOrderDetails
