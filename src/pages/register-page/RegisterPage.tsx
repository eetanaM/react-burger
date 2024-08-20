import { useRef, useState } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { registerUser } from '../../services/profile/actions'

import styles from './RegisterPage.module.css'
export default function RegisterPage() {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmitForm = () => {
        dispatch(registerUser({
            email: emailValue,
            password: passwordValue,
            userName: nameValue,
        }));
        navigate('/', { replace: true});
    }


    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <form onSubmit={handleSubmitForm}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameValue(e.target.value)}
                        value={nameValue}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mt-6"
                        />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mt-6"
                        />
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2 mt-6"
                    />
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass='mt-6'
                        onClick={handleSubmitForm}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <span
                    className={`${styles.info} text text_type_main-default mt-20`}
                >
                    Уже зарегистрированы? <Link to="/login"> Войти</Link></span>
                <span></span>
            </div>
        </>
    )
}
