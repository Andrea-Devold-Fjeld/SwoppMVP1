
import Navigation from "@/Navigation.jsx";
import Footer from "@/Footer.jsx";
import Content from "@/Content.jsx";
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

/*
        <div className={"content"} id={"content"}>
        <Content />
        </div>
        
                <div className={"sticky-top"} id={"nav"}>
            <Navigation />
        </div>       

        <div className={"sticky-bottom"} id={"footer"}>
            <Footer />                 
        </div>
 */