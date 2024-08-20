import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/preTypedHooks'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { configureUser } from '../../services/profile/actions'

import styles from './ProfilePage.module.css'

export default function ProfilePage() {
    const dispatch = useAppDispatch()
    const initialState = {
        userName: '',
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState)
    const [isChanged, setIsChanged] = useState(false)


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => {
            return {...prevData, [e.target.name]: e.target.value}
        })
        setIsChanged(true)
    }

    const submitChanges = () => {
        dispatch(configureUser(formData))
    }

    const resetChanges = () => {
        setFormData(initialState)
        setIsChanged(false)
    }

    if (isChanged && formData.email === '' && formData.password === '' && formData.userName === '') {
        setIsChanged(false)
    }

    return (
        <>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => onChange(e)}
                name='userName'
                value={formData.userName}
                extraClass="ml-1 mt-6"
            />
            <Input
                type={'email'}
                placeholder={'Логин (email)'}
                onChange={e => onChange(e)}
                name='email'
                value={formData.email}
                extraClass="ml-1 mt-6"
            />
            <PasswordInput
                onChange={e => onChange(e)}
                name='password'
                value={formData.password}
                extraClass="ml-1 mb-2 mt-6"
            />
            {isChanged &&
                <div className={styles.buttons_container}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={resetChanges}>
                        Отмена
                    </Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={submitChanges}>
                        Сохранить
                    </Button>
                </div>}
        </>
    )
}