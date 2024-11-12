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
                    console.error("Error checking transporter role:", error);
                });
        }
    }, [auth, navigate]);


    console.log("Transporte2r: ", transporter);

    return (
        <>
            <div className={"navigation sticky-top"} id={"protected-nav"}>

                {transporter ?
                    <>
                        <Navbar expand="lg" className="bg-body-tertiary navigation">
                            <Container>
                                <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <NavDropdown title={"Packet"} id={"basic-nav-dropdown"}>
                                        <NavDropdown.Item href={"/addPacket"}>Add Packet</NavDropdown.Item>
                                        <NavDropdown.Item href={"/allPackets"}>See all packets</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href={"/routeplanner"}>Route Planner</Nav.Link>
                                </Navbar.Collapse>
                                <Nav.Link href={"/logout"}>Logout</Nav.Link>
                            </Container>
                        </Navbar>
                    </> :
                    <Navbar expand="lg" className="bg-body-tertiary justify-content-center">
                        <Container>
                            <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <NavDropdown title={"Packet"} id={"basic-nav-dropdown"}>
                                    <NavDropdown.Item href={"/addPacket"}>Add Packet</NavDropdown.Item>
                                    <NavDropdown.Item href={"/allPackets"}>See all packets</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href={"/registerTransporter"}>Register as Transporter</Nav.Link>
                            </Navbar.Collapse>
                            <Nav.Link href={"/logout"}>Logout</Nav.Link>
                        </Container>
                    </Navbar>

                }
            </div>
        </>
           
    )
}