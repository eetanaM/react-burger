import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/preTypedHooks";

import { getAuthData } from "../../services/profile/reducer";

export default function ProtectedRouteElement( { element }: { element: ReactElement}) {
    const { isUserAuthenticated, loading } = useAppSelector(getAuthData)
    const location = useLocation()

    if (!loading && !isUserAuthenticated) {
        return <Navigate to='/login' state={{ previousLocation: location }}/>
    } else return element
}
