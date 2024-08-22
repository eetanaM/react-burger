import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'
import { Link, useNavigate } from 'react-router-dom'

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { registerUser } from '../../services/profile/actions'

import styles from './RegisterPage.module.css'
export default function RegisterPage() {
    const initialState = {
        userName: '',
        email: '',
        password: '',

    }
    const [formData, setFormData] = useState(initialState)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(formData));
        navigate('/', { replace: true});
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => {
            return {...prevData, [e.target.name]: e.target.value}
        })
    }

    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <form onSubmit={e => handleSubmitForm(e)}>
                    <Input
                        type='text'
                        placeholder='Имя'
                        onChange={onChange}
                        value={formData.userName}
                        name='userName'
                        extraClass="ml-1 mt-6"
                        />
                    <EmailInput
                        placeholder='E-mail'
                        onChange={onChange}
                        value={formData.email}
                        name='email'
                        extraClass="ml-1 mt-6"
                        />
                    <PasswordInput
                        onChange={onChange}
                        value={formData.password}
                        name='password'
                        extraClass="mb-2 mt-6"
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass='mt-6'
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
