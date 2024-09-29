import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import LoginForm from "@/LoginForm.jsx";
import {useState} from 'react'

function Navigation() {
    const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" className="fixed-top">
            <Container>
                <Navbar.Brand href="#home">Swoop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#packets">Packets</Nav.Link>
                        <Nav.Link href="#aboutUs">About Us</Nav.Link>
                        <Nav.Link href="#contacts">Contacts</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav>
                            <Nav.Link href="login"></Nav.Link>
                            <Nav.Link href="#register">Register</Nav.Link>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;