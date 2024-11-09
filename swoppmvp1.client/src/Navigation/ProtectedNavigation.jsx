import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useEffect} from "react";
import '../index.css';
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";


export default function ProtectedNavigation(){
    const { transporter, handleUpdateTransporter } = useOutletContext || {};
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    
    const transporterClaim = transporter;
    

    /*
    useEffect(() => {
        checkTransporterRole(auth)
            .then((response) => {
                setTransporter(response);
                setLoading(false);
            })
    }, []);
*/
    console.log("Transporte2r: ", transporterClaim);

    /*
     <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="/">SWOPP</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <NavDropdown title={"Packet"} id={"basic-nav-dropdown"}>
                                    <NavDropdown.Item href={"/addPacket"}>Add Packet</NavDropdown.Item>
                                    <NavDropdown.Item href={"/allPackets"}>See all packets</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href={"/registerTransporter"}>Register as Transporter</Nav.Link>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
     */
    return (
        <>
            <div className={"navigation sticky-top"} id={"protected-nav"}>

                {transporterClaim ?
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
                        </Container>
                    </Navbar>

                }
            </div>
        </>
           
    )
}