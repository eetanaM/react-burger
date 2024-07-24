import React from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay"


const modalRoot = document.querySelector('#react-modals') as HTMLElement

export default function Modal(props:any) {
    const {onModalClose, children} = props;

    React.useEffect(() => {
        window.addEventListener('keydown', (e:any) => {
            if (e.key === "Escape") {
                onModalClose();
            }});

        return () => {
            window.removeEventListener('keydown', (e:any) => {
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
