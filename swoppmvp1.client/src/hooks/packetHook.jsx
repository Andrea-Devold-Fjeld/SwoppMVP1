import {useAuth} from "@/hooks/AuthProvider.jsx";


export const getPacketByUserId = async () => {
    const param = new URLSearchParams();
    const packet = [];
    const auth = useAuth();
    const response = await fetch("packet/getpacketsbyuserid/", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + auth.token,
        },
    }).then(res => res.json()
        .then((json => packet.push(json))));
    
    console.log("IN packet: "+packet);
    return response;
    
}