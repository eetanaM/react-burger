import { useState } from 'react'

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../utils/api'


export default function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('')
    const navigate = useNavigate()

    const resetPasswordHandler = async () => {
        const result = await resetPassword(emailValue)
        if (result.success) {
            localStorage.setItem('resetPassword', "true")
            navigate('/reset-password')
        }
    }

    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    extraClass="ml-1 mt-6"
                    />
                <Button
                    htmlType="button"
                    type="primary"
                    extraClass='mt-6'
                    onClick={resetPasswordHandler}
                >
                    Восстановить
                </Button>
                <span
                    className='info text text_type_main-default mt-20'
                >
                    Вспомнили пароль? <Link to="/login"> Войти</Link></span>
                <span></span>
            </div>
        </>
    )
}
