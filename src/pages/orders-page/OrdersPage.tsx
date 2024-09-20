import OrdersList from '../../components/orders-list/OrdersList'
import styles from './OrdersPage.module.css'

const OrdersPage = (): React.JSX.Element => {
    return (
        <div className={`${styles.orders_page_list_container} mt-15`}>
            <OrdersList withStatus={true}/>
        </div>
    )
}

export default OrdersPage
