import {useAuth} from "@/hooks/AuthProvider.jsx";


export default function Logout(){
    const auth = useAuth();
    auth.logOut();
    return (
        <>
            <h1>Logging out...</h1>
        </>
    )
}