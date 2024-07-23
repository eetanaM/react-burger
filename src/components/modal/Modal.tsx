import React from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay"

const modalRoot = document.querySelector('#react-modals') as HTMLElement

export default function Modal(props:any) {
    const {onModalClose} = props;
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onModalClose={onModalClose}>
                    <div className={styles.modal_overlay_cardholder}>
                        <h3>Детали ингредиентов</h3>
                        <button>X</button>
                    </div>
                </ModalOverlay>
            </>
        ),
        modalRoot
    )
}
