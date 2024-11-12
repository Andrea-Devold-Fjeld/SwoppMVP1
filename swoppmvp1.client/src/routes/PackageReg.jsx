import {addPacket} from "@/hooks/PacketHooks.jsx";
import {useState, useEffect, useRef} from "react";
import {useAuth} from "@/hooks/AuthProvider.jsx";

function PackageReg({packet}) {
    const [response, setResponse] = useState("");
    console.log("packet", packet);
    const auth = useAuth();
    const isSendt = useRef(false);

    useEffect(() => {
        if(isSendt.current) return;
        isSendt.current = true;
        addPacket(packet, auth)
            .then(response => {
                console.log("response", response);
                if (response === true) {
                    console.log("Packet added");
                    setResponse("Package registered");
                } else {
                    console.log("Error in adding packet");
                    setResponse("Error in adding package");
                }})
            .catch(e => {
                console.log("Error in adding packet", e);
                setResponse("Error in adding package");
            })
    }, [packet, auth])
    
        //setResponse( await addPacket(packet));
        //console.log("response", response);

    return (
        <>
            <div>
                <h1>Package Registration</h1>
                {response}
            </div>
        </>
    )

}

export default PackageReg;