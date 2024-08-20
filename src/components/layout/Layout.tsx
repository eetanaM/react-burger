import { Outlet } from "react-router";
import AppHeader from "../../components/app-header/AppHeader";

export default function Layout() {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}
