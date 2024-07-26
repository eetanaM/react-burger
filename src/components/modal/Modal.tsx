import React from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay"
import { ModalProps } from "../../utils/type"


const modalRoot = document.querySelector('#react-modals') as HTMLDivElement

export default function Modal({onModalClose, children}: ModalProps) {

    React.useEffect(() => {
        window.addEventListener('keydown', (e:KeyboardEvent) => {
            if (e.key === "Escape") {
                onModalClose();
            }});

        return () => {
            window.removeEventListener('keydown', (e:KeyboardEvent) => {
                if (e.key === "Escape") {
                    onModalClose();
                }})
        }
    }, [onModalClose])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onModalClose={onModalClose}></ModalOverlay>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
}
