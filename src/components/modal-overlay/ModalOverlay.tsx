import React from "react"
import styles from "./ModalOverlay.module.css"

export default function ModalOverlay(props:any) {
    const {onModalClose} = props;
    return (
        <>
            <div className={styles.modal_overlay} onClick={onModalClose}>
                {props.children}
            </div>
        </>
    )
}
