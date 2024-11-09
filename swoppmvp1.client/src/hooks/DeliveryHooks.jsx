import { useAuth} from "@/hooks/AuthProvider.jsx";
import queryString from "query-string";


export const useDeliveryByUserId = () => {
    const { user } = useAuth();
    
    const getDeliveriesByUserId2 = async () => {
        
        try {
            const response = await fetch(`/delivery/getdeliverybyuserid/${user.userId}`, {
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
export const getDeliveriesByUserId = async (auth) => {
    try {
        const response = await fetch(`/delivery/getdeliverybyuserid`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        if(response.status === 401){
            auth.refreshTokenAPI(auth.refreshToken);
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
            alert("Error in fetching deliveries");
            console.log("Error in fetching deliveries");
        }
    } catch (e) {
        console.log(e);
    }
}

export const addPacketToDelivery = async (packetId, deliveryId, auth) => {
    const url = {}
    url.packetId = packetId;
    url.deliveryId = deliveryId;
    const query = queryString.stringify(url);
    try {
        const response = await fetch(`/delivery/addpackettodelivery?${query}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.tooken}`
            }
        })
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const createDelivery = async (packetId, auth) => {
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