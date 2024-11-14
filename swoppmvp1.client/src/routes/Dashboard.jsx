import {useState, useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "@/cards/UserDetail.jsx";
import PacketDetails from "@/routes/PacketDetails.jsx";
import DeliveryDetails from "@/routes/DeliveryDetails.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Dashboard() {
    const context = useOutletContext();
    const {transporter, handleUpdateTransporter} = useOutletContext();

    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    
    return (
        <>
            {loading ? (<p>...loading</p>) : (
                <>
                    {transporter ?
                        <div className={"dashboard"}>
                            <Tabs
                                defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                justify>
                                <Tab eventKey="profile" title="Profile">
                                    <UserDetails transporter={transporter}/>
                                </Tab>
                                <Tab eventKey="packet" title="Packet">
                                    <PacketDetails auth={auth}/>
                                </Tab>
                                <Tab eventKey="delivery" title="Delivery">
                                    <DeliveryDetails auth={auth} />
                                </Tab>

                            </Tabs>
                        </div>
                        :
                        <div className={"dashboard"}>
                            <Tabs
                                defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                justify>
                                <Tab eventKey="profile" title="Profile">
                                    <UserDetails/>
                                </Tab>
                                <Tab eventKey="packet" title="Packet">
                                    <PacketDetails auth={auth}/>
                                </Tab>
                            </Tabs>
                        </div>}
                </>
                    
            )}
        </>

    )
}
