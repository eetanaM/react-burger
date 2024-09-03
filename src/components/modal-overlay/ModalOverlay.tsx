import { IModalProps } from "../../utils/type";

import styles from "./ModalOverlay.module.css"

export default function ModalOverlay({ onClose }: IModalProps) {

    return (
        <>
            <div className={styles.modal_overlay} onClick={onClose}>
            </div>
        </>
    )
}
