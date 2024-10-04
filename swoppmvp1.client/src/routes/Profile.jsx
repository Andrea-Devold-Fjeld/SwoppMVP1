import {useAuth} from "@/hooks/AuthProvider.jsx";
import {getTransporerClaim} from "@/hooks/userHook.jsx";
import {getPacketByUserId} from "@/hooks/packetHook.jsx";
import PacketComponent from "@/PacketComponent.jsx";
import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";

export default function Profile() {
    const [transporterClaim, setTransporterClaim] = useState("false");
    const [packet, setPacket] = useState({});
    const [loading, setLoading] = useState(true);
    
    const claim = getTransporerClaim().then(res => console.log("const claim: "+res));
    const pack = getPacketByUserId().then(res => console.log(res.toString()));
 

    console.log(transporterClaim);
    console.log(packet)

    return (
        <div>
            <h2>User: </h2>
            <h3>Claim</h3>
            {claim}
            <div className="card">
            </div>
            <h3>Packets</h3>
            {pack}
            <div className="card">
            </div>
        </div>
    )
}