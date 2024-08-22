import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'

import styles from './ResetPassword.module.css'
import NotFoundPage from '../not-found-page/NotFoundPage'
import { refreshPassword } from '../../utils/api'

export default function ResetPasswordPage() {
    const initialState = {
        password: '',
        token: ''
    }
    const [formData, setFormData] = useState(initialState)
    const isResetPasswordPageAvailable = localStorage.getItem('resetPassword')
    const navigate = useNavigate()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitPasswordRefresh = async (e: FormEvent) => {
        e.preventDefault();
        const result = await refreshPassword(formData.password, formData.token)
        if (result.success) {
            localStorage.removeItem('resetPassword')
            alert('Пароль успешно изменен');
            navigate('/login')
        }
    }

    if (!isResetPasswordPageAvailable) {
        return <NotFoundPage />
    } else {
        return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <form onSubmit={e => submitPasswordRefresh(e)}>
                    <PasswordInput
                        placeholder='Введите новый пароль'
                        onChange={e => onChange(e)}
                        value={formData.password}
                        name={'password'}
                        extraClass="mb-2 mt-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => onChange(e)}
                        value={formData.token}
                        name={'token'}
                        extraClass="ml-1 mt-6"
                        />
                    <Button
                        htmlType="submit"
                        type="primary"
                        extraClass='mt-6'
                    >
                        Сохранить
                    </Button>
                    </form>
                <span
                    className={`${styles.info} text text_type_main-default mt-20`}
                >
                    Вспомнили пароль? <Link to="/login"> Войти</Link></span>
                <span></span>
            </div>
        </>
    )}
}
