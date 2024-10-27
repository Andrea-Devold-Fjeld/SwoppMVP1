import AddPacketForm from "@/forms/AddPacketForm.jsx";
import {useState} from "react";

function AddPacket() {
    const [packet, setPacket] = useState(null);
    return (
        <>
            <div>
                {packet}
            </div>
            <div className={"addPacket"} id={"addPacketForm"}>
                <AddPacketForm />
            </div>
        </>    
    )
}

export default AddPacket;