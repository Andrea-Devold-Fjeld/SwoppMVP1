
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
        if(response.status === 401){
            await auth.refreshTokenAPI(auth.refreshToken);
            const refreshedResponse = await fetch(`/delivery/getdeliverybyuserid`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${auth.token}`
                }})
            if (refreshedResponse.status === 200) {
                return await refreshedResponse.json();
            }else {
                console.log("Error in refreshing token");
            }
        }else if (response.status === 200) {
            return await response.json();
        }else {
            alert("Error in fetching packet by user id");
            console.log("Error in fetching packet by user id");
        }
    } catch (e) {
        console.log(e);
    }
}

export const addPacket = async (packet, auth) => {
        console.log(auth.token);
        console.log(packet);
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
                //navigate("/login)")
            });
            const data = await response.json();
            console.log("In packet hooks", data);
            if(data === true) return data;
            if(data.status === 401){
                console.log("Error in adding packet");
                await auth.refreshTokenAPI(auth.refreshToken);
                const refreshedResponse = await fetch(`/packet/addpacket`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${auth.token}`
                    },
                    body: JSON.stringify(packet)
                })
                const refreshedData = await refreshedResponse.json();
                if(refreshedData.status === 200) {
                    console.log("Packet added");
                    return refreshedData;
                }else {
                    console.log("Error in adding packet");
                }
            }else if(data.status !== 200){
                console.log("Error in adding packet");
            }else {
                console.log("Packet added")
                return data;
            }
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
