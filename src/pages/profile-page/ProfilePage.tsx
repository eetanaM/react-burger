import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'
import { useForm } from '../../hooks/useForm'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { configureUser } from '../../services/profile/actions'

import { IRegister } from '../../utils/types/type'

import styles from './ProfilePage.module.css'

const ProfilePage = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const initialState = { userName: '', email: '', password: '' }
    const { values, handleChange, setValues} = useForm<IRegister>(initialState)
    const [isChanged, setIsChanged] = useState<boolean>(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setIsChanged(true)
    }

    const submitChanges = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(configureUser(values))
    }

    const resetChanges = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValues(initialState)
        setIsChanged(false)
    }

    if (isChanged && values.email === '' && values.password === '' && values.userName === '') {
        setIsChanged(false)
    }

    return (
        <>
            <form onSubmit={e => submitChanges(e)} onReset={e => resetChanges(e)} className='mt-25'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => onChange(e)}
                    name='userName'
                    value={values.userName}
                    extraClass="ml-1 mt-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин (email)'}
                    onChange={e => onChange(e)}
                    name='email'
                    value={values.email}
                    extraClass="ml-1 mt-6"
                />
                <PasswordInput
                    onChange={e => onChange(e)}
                    name='password'
                    value={values.password}
                    extraClass="ml-1 mb-2 mt-6"
                />
                {isChanged &&
                    <div className={styles.buttons_container}>
                        <Button htmlType="reset" type="secondary">
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary">
                            Сохранить
                        </Button>
                    </div>}
            </form>
        </>
    )
}

export default ProfilePage
