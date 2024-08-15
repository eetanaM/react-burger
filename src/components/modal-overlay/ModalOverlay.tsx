import { ModalProps } from "../../utils/type";

import styles from "./ModalOverlay.module.css"

export default function ModalOverlay({ hideModal }: ModalProps) {

    return (
        <>
            <div className={styles.modal_overlay} onClick={hideModal}>
            </div>
        </>
    )
}
