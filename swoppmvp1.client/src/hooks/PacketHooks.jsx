
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

export const getPackets = async (auth) => {
   // const auth = useAuth();
    try {
        const response = await fetch("/packet/getpackets", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        return await response.json();
    }catch (e) {
        console.log(e);
    }
}

export const getPacketById = async (packetId) => {
    const auth = useAuth();
    try {
        const response = await fetch("/packet/getpacketbyid", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        return await response.json();
    }catch (e) {
        console.log(e);
    }
}
export const usePacketByUserId = () => {
    const {user} = useAuth();
    const getPacketByUserId = async () => {
        try {
            const response = await fetch(`/packet/getpacketByUserId`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }
}
export const getPacketByUserId = async (auth) => {
    //const auth = useAuth();
    try {
        const response = await fetch("/packet/getpacketsbyuserid", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }            
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}

export const addPacket = async (packet) => {
        const auth = useAuth();
        console.log(auth.token);
        console.log(packet);
        const navigate = useNavigate();
        try {
            const response = await fetch("/packet/addpacket", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(packet)
            }).catch((err) => {
                console.log(err);
                navigate("/login)")
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    
}

export const getAvailablePackets = async (packet) => {
    const auth = useAuth();
    try {
        const response = await fetch("/packet/getAvailavlePackets", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(packet)
        })
        return await response.json();
    }catch (err) {
        console.log(e);
    }
}

export const setAvailablePacketWithId = async (packetId) => {
    const auth = useAuth();
    //#TODO check if packetId should be sent with body or url
    try {
        const response = await fetch("/packet/setAvailablePacketWithId", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
                
            }
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}

export const updatePacket = async (packet) => {
    const auth = useAuth();
    try {
        //#TODO check if packetId should be sent with body or url
        const response = await fetch("/packet/updatepacket", {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(packet)
        })
    }catch (err) {
        console.log(err);
    }
}

export const deletePacket = async (packetId) => {
    const auth = useAuth();
    try {
        const response = await fetch("/packet/deletePacket", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(packetId)
        })
    }catch (err) {
        console.log(err);
    }
}
