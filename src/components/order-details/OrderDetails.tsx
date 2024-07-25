import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import done from '../../images/done.svg'
import styles from "./OrderDetails.module.css"

export default function OrderDetails({ onModalClose, orderId }: any) {
    return (
        <div className={`${styles.content_container} pr-10 pl-10`}>
            <div className={`${styles.content_header} mt-15`}>
                <button onClick={onModalClose}>
                    <CloseIcon type="primary"/>
                </button>
            </div>
            <h2 className="text text_type_digits-large mb-8">{orderId}</h2>
            <span className="text text_type_main-default mb-15">идентификатор заказа</span>
            <img src={done} alt="done icon" className="mb-15"/>
            <span className="text text_type_main-small mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-small text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}
