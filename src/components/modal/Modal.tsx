import React from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ModalProps } from "../../utils/type"


const modalRoot = document.querySelector('#react-modals') as HTMLDivElement

export default function Modal({onModalClose, children, header}: ModalProps) {

    React.useEffect(() => {
        function closeByEscape(e:KeyboardEvent) {
            if (e.key === "Escape") {
                onModalClose();
            }}
        window.addEventListener('keydown', closeByEscape);

        return () => {
            window.removeEventListener('keydown', closeByEscape)
        }
    }, [onModalClose])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onModalClose={onModalClose}/>
                <div className={`${styles.modal_content} pr-10 pl-10`}>
                    <div className={`${styles.content_header} ${header? "mt-10" : "mt-15"} pt-3 pb-3`}>
                        <h2 className="text text_type_main-large">{header}</h2>
                        <button onClick={onModalClose}>
                            <CloseIcon type="primary"/>
                        </button>
                    </div>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
}
