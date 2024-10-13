import ReactDOM from "react-dom"
import { useEffect } from "react"

import ModalOverlay from "../modal-overlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./Modal.module.css"
import { IModalProps } from "../../utils/types/type"

const modalRoot = document.querySelector('#react-modals') as HTMLDivElement

const Modal = ({ children, onClose }: IModalProps): React.JSX.Element => {

    useEffect(() => {
        function closeByEscape(e:KeyboardEvent) {
            if (e.key === "Escape") onClose()}
        window.addEventListener('keydown', closeByEscape);

        return () => {
            window.removeEventListener('keydown', closeByEscape)
        }
    }, [])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div
                    className={`${styles.modal_content} pr-10 pl-10`}
                    data-testid="modal_test_element"
                >
                    <button
                        onClick={onClose}
                        data-testid="modal_test_close_button"
                    >
                        <CloseIcon type="primary"/>
                    </button>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
}

export default Modal
