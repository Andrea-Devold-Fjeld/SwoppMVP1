import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from "@/hooks/AuthProvider.jsx";
import ProtectedNavigation from "@/Navigation/ProtectedNavigation.jsx";

export default function ProtectedLayout() {
    const user = useAuth();
    if(!user.token) return <Navigate to="/login" />;
    return (
        <div>
            <div className={"nav"}>
                <ProtectedNavigation />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}