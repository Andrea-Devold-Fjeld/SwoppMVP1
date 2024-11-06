import {useAuth} from "@/hooks/AuthProvider.jsx";
import queryString from "query-string";


export const getDeliveriesByUserId = async (id) => {
    const auth = useAuth();
    try {
        const response = await fetch(`/delivery/getdeliverybyuserid`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const addPacketToDelivery = async (packetId, deliveryId) => {
    const auth = useAuth();
    const url = {}
    url.packetId = packetId;
    url.deliveryId = deliveryId;
    const query = queryString.stringify(url);
    try {
        const response = await fetch(`/delivery/addpackettodelivery?${query}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const createDelivery = async (packetId) => {
    const auth = useAuth();
    const url = {}
    url.packetId = packetId;
    const query = queryString.stringify(url);
    console.log("In create delivery query: ", query);
    try {
        const response = await fetch(`/delivery/adddelivery?${query}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        }).then((response) => {
            return response.ok;
        })
    } catch (e) {
        console.log(e);
    }
}