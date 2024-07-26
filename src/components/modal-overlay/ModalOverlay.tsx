import React from "react"
import styles from "./ModalOverlay.module.css"
import { ModalProps } from "../../utils/type";

export default function ModalOverlay(props: ModalProps) {
    const {onModalClose} = props;
    return (
        <>
            <div className={styles.modal_overlay} onClick={onModalClose}>
                {props.children}
            </div>
        </>
    )
}
