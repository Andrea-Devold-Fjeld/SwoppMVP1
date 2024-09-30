import {useAuth} from "@/hooks/AuthProvider.jsx";
import {getTransporerClaim} from "@/hooks/userHook.jsx";
import {getPacketByUserId} from "@/hooks/packetHook.jsx";
import PacketComponent from "@/PacketComponent.jsx";
import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

export default function Profile() {
    const [transporterClaim, setTransporterClaim] = useState(null);
    const [packet, setPacket] = useState({});
    const auth = useAuth();
    
    const p = getTransporerClaim()
        .finally(data => setTransporterClaim(data));
    const t = getTransporerClaim();
    
    console.log(p);
    console.log(t);
    //setTransporterClaim(getTransporerClaim())
    //setPacket(getPacketByUserId());
    //const transporter = getTransporerClaim();
    //const packets = getPacketByUserId(auth.userId);
    
    /*
    const [result, error, state] = usePromise(
        () => {
            return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(getTransporerClaim()),
                        1000
                    }),
                    [transporterClaim]
                }
            );
        });
    console.log(result);
    
    useEffect(() =>  {
        getTransporerClaim([transporterClaim])
        getPacketByUserId([packet])
    }, [packet, transporter]);
    
     */
    /*
    console.log(packet);
    console.log(transporterClaim);
    
     */
    
     
    return (
        <div>
            <h2>User</h2>
            <h3>Claim</h3>
            <h3>Packets</h3>
        </div>
    )
    /*
    if(!transporterClaim.value){
        return (
            <>
                <h2>User : {auth.user}</h2>
                <Button>Register as transporter</Button>
                <h2>Your packets</h2>
                <PacketComponent packet={packet} />
            </>
        )
    }
    
     */

}