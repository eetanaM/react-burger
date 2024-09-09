import { Outlet } from "react-router";
import AppHeader from "../../components/app-header/AppHeader";

const Layout = (): React.JSX.Element => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}

export default Layout
