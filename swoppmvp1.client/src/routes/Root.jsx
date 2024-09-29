import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthProvider from "@/AuthProvider.jsx";
import Navigation from "@/Navigation.jsx";
import Footer from "@/Footer.jsx";
import Content from "@/Content.jsx";


const Root=({children})=> {
    return (
        <div>
        <div className={"sticky-top"} id={"nav"}>
            <Navigation />
        </div>       
        <div className={"content"} id={"content"}>
        <Content />
        </div>
        <div className={"sticky-bottom"} id={"footer"}>
            <Footer />                 
        </div>
        </div>
    )
}

export default Root;