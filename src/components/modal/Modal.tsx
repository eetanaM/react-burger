import ReactDOM from "react-dom"
import { ReactElement, useEffect } from "react"

import ModalOverlay from "../modal-overlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./Modal.module.css"
import { ModalProps } from "../../utils/type"

const modalRoot = document.querySelector('#react-modals') as HTMLDivElement

export default function Modal({ children, header, onClose }: ModalProps) {

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
                <div className={`${styles.modal_content} pr-10 pl-10`}>
                    <div className={`${styles.content_header} ${header? "mt-10" : "mt-15"} pt-3 pb-3`}>
                        <h2 className="text text_type_main-large">{header}</h2>
                        <button onClick={onClose}>
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
