import { Outlet } from "react-router";

import styles from './ProfilePageLayout.module.css'
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/preTypedHooks";
import { logoutUser } from "../../services/profile/actions";

const ProfilePageLayout = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const chooseTextStyle = (isActive: boolean) => {
        return `${isActive ? '' : 'text_color_inactive'}`
    }

    const logout = () => {
        return confirm("Уверены, что желаете выйти?") && dispatch(logoutUser())
    }

    return (
        <>
            <div className={styles.profile_container}>
                <ul className={`${styles.menu_bar} mr-15`}>
                    <NavLink to='/profile' end>
                        {({ isActive }) => (
                        <h2
                            className={`text text_type_main-medium ${chooseTextStyle(isActive)} mt-4 mb-4`}
                        >
                            Профиль
                        </h2>)}
                    </NavLink>
                    <NavLink to='/profile/orders'>
                        {({ isActive }) => (
                        <h2 className={`text text_type_main-medium ${chooseTextStyle(isActive)} mt-4 mb-4`}
                        >
                            История заказов
                        </h2>)}
                    </NavLink>
                    <button className={styles.logout_button} onClick={logout}>
                        <h2 className="text text_type_main-medium text_color_inactive mb-20"
                        >
                            Выход
                        </h2>
                    </button>
                    <p className="text text_type_main-default text_color_inactive">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </ul>
                <div className={styles.outlet_container}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ProfilePageLayout;
