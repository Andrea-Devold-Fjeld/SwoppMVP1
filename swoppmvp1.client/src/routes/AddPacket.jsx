import AddPacketForm from "@/forms/AddPacketForm.jsx";
import {useState} from "react";

function AddPacket() {
    const [packet, setPacket] = useState(null);
    return (
        <div className={"dashboard"}>
            <div>
                {packet}
            </div>
            <div className={"addPacket"} id={"addPacketForm"}>
                <AddPacketForm />
            </div>
        </div>    
    )
}

export default AddPacket;