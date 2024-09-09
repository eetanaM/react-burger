import { IModalProps } from "../../utils/types/type";

import styles from "./ModalOverlay.module.css"

const ModalOverlay = ({ onClose }: IModalProps): React.JSX.Element => {

    return (
        <>
            <div className={styles.modal_overlay} onClick={onClose}>
            </div>
        </>
    )
}

export default ModalOverlay
