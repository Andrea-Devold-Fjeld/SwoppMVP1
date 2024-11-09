import {addPacket} from "@/hooks/PacketHooks.jsx";
import {useState, useEffect} from "react";

function PackageReg({packet}) {
    console.log("packet", packet);

    const response = addPacket(packet);
        //setResponse( await addPacket(packet));
        console.log("response", response);

    return (
        <>
            <div>
                <h1>Package Registration</h1>
            </div>
        </>
    )

}

export default PackageReg;