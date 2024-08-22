import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { loginUser } from '../../services/profile/actions'

export default function LoginPage() {
    const initialState = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState)
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate()

    const handleSubmitForm = () => {
        dispatch(loginUser(formData))
        if(location.state?.previousLocation) {
            navigate(location.state.previousLocation)
        } else navigate('/')
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => {
            return {...prevData, [e.target.name]: e.target.value}
        })
    }

    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Вход</h2>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => onChange(e)}
                    name='email'
                    value={formData.email}
                    extraClass="ml-1 mt-6"
                />
                <PasswordInput
                    onChange={e => onChange(e)}
                    name='password'
                    value={formData.password}
                    extraClass="mb-2 mt-6"
                />
                <Button
                    htmlType="button"
                    type="primary"
                    extraClass='mt-6'
                    onClick={handleSubmitForm}
                >
                    Войти
                </Button>
                <span
                    className='info text text_type_main-default mt-20'
                >
                    Вы - новый пользователь? <Link to="/register"> Зарегистрироваться</Link></span>
                <span></span>
                <span
                    className='info text text_type_main-default mt-4'
                >
                    Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></span>
                <span></span>
            </div>
        </>
    )
}
