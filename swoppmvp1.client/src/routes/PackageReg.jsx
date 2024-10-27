import {addPacket} from "@/hooks/PacketHooks.jsx";
import {useState, useEffect} from "react";
function PackageReg(packet) {
    const [response, setResponse] = useState({});
    console.log("packet", packet);
    useEffect(async () => {
        console.log("in use effect");
        const response = await addPacket(packet);
        //setResponse( await addPacket(packet));
    }, [response]);
    return (
        <>
            <div>
                <h1>Package Registration</h1>
                <p>{response}</p>
            </div>
        </>
    )

}

export default PackageReg;