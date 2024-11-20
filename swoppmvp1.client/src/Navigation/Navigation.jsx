import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css';

//#292e58
//Darker color: #21264c
//lighter color: #323868
function Navigation(){
    return (
        <div className="navigation sticky-top">
            <Navbar variant={"dark"} expand="lg" data-bs-theme="dark" className="justify-content-center bg-transparent">
                <Container>
                    <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href={"/"}>About (Not implemented)</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation;