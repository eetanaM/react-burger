import { FormEvent } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'
import { useForm } from '../../hooks/useForm'
import { Link, Location, useLocation, useNavigate } from 'react-router-dom'

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { loginUser } from '../../services/profile/actions'

import { ILogin } from '../../utils/types/type'

const LoginPage = (): React.JSX.Element => {
    const initialState = { email: '', password: '' }
    const { values, handleChange } = useForm<ILogin>(initialState)
    const dispatch = useAppDispatch();
    const location = useLocation() as Location<{ previousLocation: Location }>;
    const navigate = useNavigate()

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(values))
        if(location.state?.previousLocation) {
            navigate(location.state.previousLocation)
        } else navigate('/')
    }

    return (
        <>
            <div className="sign_in_container">
                <h2 className="text text_type_main-medium">Вход</h2>
                <form onSubmit={e => handleSubmitForm(e)}>
                    <EmailInput
                        placeholder={'E-mail'}
                        onChange={e => handleChange(e)}
                        name='email'
                        value={values.email ?? ""}
                        extraClass="ml-1 mt-6"
                        data-testid = "email_input"
                    />
                    <PasswordInput
                        onChange={e => handleChange(e)}
                        name='password'
                        value={values.password ?? ""}
                        extraClass="mb-2 mt-6"
                        data-testid = "password_input"
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        extraClass='mt-6'
                    >
                        Войти
                    </Button>
                </form>
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

export default LoginPage
