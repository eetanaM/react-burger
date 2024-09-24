import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppSelector } from "../../hooks/preTypedHooks"
import { getOrderInfo } from "../../services/order-details/slice"
import IngredientIcon from "../orders-list/order-card/ingredient-icon/IngredientIcon"
import styles from './FeedOrderDetails.module.css'

const FeedOrderDetails = (): React.JSX.Element => {

    const today = new Date();
    const order = {
        status: 'Выполнен',
        number: '53381',
        name: 'Ультра экстра бургер',
        ingredients: [
            {
                _id:"643d69a5c3f7b9001cfa093c",
                name:"Краторная булка N-200i",
                type:"bun",
                proteins:80,
                fat:24,
                carbohydrates:53,
                calories:420,
                price:1255,
                image:"https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v:0,
                counter:0
            },
            {
                _id:"643d69a5c3f7b9001cfa093c",
                name:"Краторная булка N-200i",
                type:"bun",
                proteins:80,
                fat:24,
                carbohydrates:53,
                calories:420,
                price:1255,
                image:"https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v:0,
                counter:0
            },
            {
                _id: '643d69a5c3f7b9001cfa0943',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
                __v: 0,
                counter: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa093d',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
                counter: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa0944',
                name: 'Соус традиционный галактический',
                type: 'sauce',
                proteins: 42,
                fat: 24,
                carbohydrates: 42,
                calories: 99,
                price: 15,
                image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
                __v: 0,
                counter: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa0945',
                name: 'Соус с шипами Антарианского плоскоходца',
                type: 'sauce',
                proteins: 101,
                fat: 99,
                carbohydrates: 100,
                calories: 100,
                price: 88,
                image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
                __v: 0,
                counter: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa0946',
                name: 'Хрустящие минеральные кольца',
                type: 'main',
                proteins: 808,
                fat: 689,
                carbohydrates: 609,
                calories: 986,
                price: 300,
                image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
                __v: 0,
                counter: 0
              },
        ]
    }

    const filteredIngredients = Array.from(new Set(order.ingredients.map(el =>  JSON.stringify(el)))).map(el => JSON.parse(el))

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

    let statusTextColor
    switch (order?.status) {
        case "Выполнен":
            statusTextColor = {color: "#00CCCC"};
            break;
        case "Готовится":
            statusTextColor = {color: "#ffffff"};
            break;
        case "Отменен":
            statusTextColor = {color: "#ce0c0c"};
            break;
        case "Создан":
            statusTextColor = {color: "#ffffff"};
            break;
    }

    const totalPrice =  order.ingredients.reduce((acc, current) => acc + current.price, 0)

    if (order) return (
        <>
            <div className={styles.order_details_container}>
                <p
                    className={`${styles.order_details_number} text text_type_digits-default`}
                >{`#${order.number}`}</p>
                <p className="text text_type_main-medium mt-10">{order.name}</p>
                <p
                    className="text text_type_main-default mt-3"
                    style={statusTextColor}
                >
                    {order.status}
                </p>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <ul className={`${styles.order_details_ingredients_list} mt-6 custom-scroll`}>
                    {ingredientsToRender}
                </ul>
                <div className={`${styles.order_details_footer} mt-10`}>
                    <span
                        className="text text_type_main-default text_color_inactive"
                    >
                        <FormattedDate
                            date={
                                new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate(),
                                    today.getHours(),
                                    today.getMinutes() - 1,
                                    0,
                                )
                            }
                        />
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
    return <div className={styles.order_details_container}></div>
}

export default FeedOrderDetails
