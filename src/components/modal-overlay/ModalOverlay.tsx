import React from "react"
import styles from "./ModalOverlay.module.css"
import { ModalProps } from "../../utils/type";

export default function ModalOverlay({ children, hideModal }: ModalProps) {

    return (
        <>
            <div className={styles.modal_overlay} onClick={hideModal}>
                {children}
            </div>
        </>
    )
}
