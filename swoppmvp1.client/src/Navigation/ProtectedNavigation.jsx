import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useEffect, useRef} from "react";
import '../index.css';
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function ProtectedNavigation(){
    const [loading, setLoading] = useState(true);
    const[transporter, setTransporter] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const hasCheckedRole = useRef(false);

    useEffect(() => {
        if (!auth || !auth.token) {
            console.log("User or token does not exist");
            navigate("/login");
        }else if (!hasCheckedRole.current) {
            hasCheckedRole.current = true;
            checkTransporterRole(auth, navigate)
                .then((response) => {
                    console.log("response in useffect in protected layout",response);
                    if(response.value === "false") {
                        console.log("User is not a transporter");

                    }
                    else if(response.value === "true") {
                        console.log("User is a transporter");
                        setTransporter(true);

                    }
                })
                .catch((error) => {
                    navigate("/login");
                });
        }
    }, [auth, navigate]);

/*
                                    <NavDropdown title={"Packet"} id={"basic-nav-dropdown"}>
                                        <NavDropdown.Item href={"/addPacket"}><p className={"text-white"}>Add Packet</p> </NavDropdown.Item>
                                        <NavDropdown.Item href={"/allPackets"}>See all packets</NavDropdown.Item>
                                    </NavDropdown>
 */
    console.log("Transporte2r: ", transporter);

    return (
        <>
            <div className={"navigation sticky-top"} id={"protected-nav"}>

                {transporter ?
                    <>
                        <Navbar variant={"dark"} expand="lg" data-bs-theme="dark" className="justify-content-center bg-transparent">
                            <Container>
                                <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav>
                                        <Nav.Link href={"/allPackets"}>All packets</Nav.Link>
                                        <Nav.Link href={"/addPacket"}>Add packet</Nav.Link>
                                        <Nav.Link href={"/routeplanner"}>Route Planner</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                                <Nav>
                                    <Nav.Link href={"/logout"}>Logout</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </> :
                    <Navbar variant={"dark"} expand="lg" data-bs-theme="dark" className="justify-content-center bg-transparent">
                        <Container>
                            <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <Nav.Link href={"/allPackets"}>All packets </Nav.Link>
                                    <Nav.Link href={"/addPackets"}>Add packets</Nav.Link>
                                    <Nav.Link href={"/registerTransporter"}>Register as Transporter</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <Nav>
                                <Nav.Link href={"/logout"}>Logout</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>

                }
            </div>
        </>
           
    )
}