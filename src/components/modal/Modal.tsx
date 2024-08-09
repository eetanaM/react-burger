import ReactDOM from "react-dom"
import { useEffect } from "react"
import { useAppDispatch } from "../../hooks/preTypedHooks"

import ModalOverlay from "../modal-overlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import { ModalProps } from "../../utils/type"

import styles from "./Modal.module.css"

const modalRoot = document.querySelector('#react-modals') as HTMLDivElement

export default function Modal({ header, children }: ModalProps) {
    const dispatch = useAppDispatch()

    function hideModal() {
        dispatch({
            type: 'ingredient-details/hideIngredient'
        });
        dispatch({
            type: "order-details/hideOrder"
        })
    }

    useEffect(() => {
        function closeByEscape(e:KeyboardEvent) {
            if (e.key === "Escape") hideModal()}
        window.addEventListener('keydown', closeByEscape);

        return () => {
            window.removeEventListener('keydown', closeByEscape)
        }
    }, [dispatch])

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay hideModal={hideModal}/>
                <div className={`${styles.modal_content} pr-10 pl-10`}>
                    <div className={`${styles.content_header} ${header? "mt-10" : "mt-15"} pt-3 pb-3`}>
                        <h2 className="text text_type_main-large">{header}</h2>
                        <button onClick={hideModal}>
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
