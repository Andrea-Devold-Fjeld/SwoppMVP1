import {Outlet, Navigate} from 'react-router-dom'
import Navigation from "@/Navigation/Navigation.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";

export default function ProtectedLayout() {
    const user = useAuth();
    if(!user.token) return <Navigate to="/login" />;
    return (
        <div>
            <div className={"nav"}>
                <Navigation />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}