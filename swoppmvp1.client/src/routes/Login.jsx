import LoginForm from "@/LoginForm.jsx";
import Navigation from "@/Navigation.jsx";
import Footer from "@/Footer.jsx";

function Login () {
    return (
        <div>
            <div className={"sticky-top"} id={"nav"}>
                <Navigation />
            </div>
            <div className={"loggInForm"} id={"content"}>
                <LoginForm />
            </div>
            <div className={"sticky-bottom"} id={"footer"}>
                <Footer />
            </div>
        </div>
    )
}

export default Login;