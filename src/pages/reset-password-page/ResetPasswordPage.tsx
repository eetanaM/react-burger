import { FormEvent } from 'react'
import { useForm } from '../../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import NotFoundPage from '../not-found-page/NotFoundPage'

import styles from './ResetPassword.module.css'

import { refreshPassword } from '../../utils/api'

import { IRefreshPassword } from '../../utils/type'

const ResetPasswordPage = (): React.JSX.Element => {
    const initialState = { password: '', token: '' }
    const { values, handleChange } = useForm<IRefreshPassword>(initialState)
    const isResetPasswordPageAvailable = localStorage.getItem('resetPassword')
    const navigate = useNavigate()

    const submitPasswordRefresh = async (e: FormEvent) => {
        e.preventDefault();
        const result = await refreshPassword(values.password, values.token)
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
                        onChange={e => handleChange(e)}
                        value={values.password}
                        name={'password'}
                        extraClass="mb-2 mt-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => handleChange(e)}
                        value={values.token}
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

export default ResetPasswordPage
