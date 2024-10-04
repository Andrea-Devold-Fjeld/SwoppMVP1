import Navigation from "@/Navigation/Navigation.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {Outlet, Navigate} from 'react-router-dom'

const Root=({children})=> {
    const { user } = useAuth();

    if (user) {
        return <Navigate to={"/dashboard"} />
    }
    return (
        <>
            <div className={"sticky-top"} id={"nav"}>
                <Navigation />
            </div>
            <Outlet />
        </>
    )
}

export default Root;
