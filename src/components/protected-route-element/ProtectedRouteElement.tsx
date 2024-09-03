import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/preTypedHooks";
import { getIsAuthChecked, getUserInfo } from "../../services/profile/reducer";
import Preloader from "../preloader/Preloader";

const ProtectedRouteElement = ({ onlyUnAuth = false, element }: { onlyUnAuth?: boolean, element: React.JSX.Element}): React.JSX.Element => {
    const user = useAppSelector(getUserInfo);
    const isAuthChecked = useAppSelector(getIsAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />
    }

    if (onlyUnAuth && user) {
        const { previousLocation } = location.state || { previousLocation: { pathname: '/' }};
        return <Navigate to={previousLocation} replace />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ previousLocation: location }}/>
    }

    return element
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }: { element: React.JSX.Element}) => <ProtectedRouteElement onlyUnAuth={true} element={element} />
