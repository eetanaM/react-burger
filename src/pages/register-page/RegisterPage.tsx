import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useAppDispatch } from '../../hooks/preTypedHooks'

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { registerUser } from '../../services/profile/actions'

import { IRegister } from '../../utils/types/type'

import styles from './RegisterPage.module.css'

const RegisterPage = (): React.JSX.Element => {
    const initialState = { userName: '', email: '', password: '' }
    const { values, handleChange } = useForm<IRegister>(initialState)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(values));
        navigate('/', { replace: true});
    }

    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <form onSubmit={e => handleSubmitForm(e)}>
                    <Input
                        type='text'
                        placeholder='Имя'
                        onChange={e => handleChange(e)}
                        value={values.userName}
                        name='userName'
                        extraClass="ml-1 mt-6"
                        />
                    <EmailInput
                        placeholder='E-mail'
                        onChange={e => handleChange(e)}
                        value={values.email}
                        name='email'
                        extraClass="ml-1 mt-6"
                        />
                    <PasswordInput
                        onChange={e => handleChange(e)}
                        value={values.password}
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

export default RegisterPage;
