import {useAuth} from "@/hooks/AuthProvider.jsx";


export const getPacketByUserId = async () => {
    const param = new URLSearchParams();
    const auth = useAuth();
    const response = await fetch("packet/getpacketsbyuserid/", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + auth.token,
        },
    })
    console.log("IN packet: "+response);

    return await response.json();
    
}