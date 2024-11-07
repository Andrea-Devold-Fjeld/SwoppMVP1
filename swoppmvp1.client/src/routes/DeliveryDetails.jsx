import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {getDeliveriesByUserId} from "@/hooks/DeliveryHooks.jsx";
import DeliveryUserCard from "@/routes/DeliveryUserCard.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";

export default function DeliveryDetails({auth}) {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        getDeliveriesByUserId(auth)
            .then((response) => {
                console.log(response);
                setDeliveries(response || []);
                setLoading(false);
            })
    }, [])
   
    return (
        <>
            <div>
            <h3>My deliveries</h3>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                deliveries.length > 0 ? (
                    <div id="packet-user-details">
                        {deliveries.map((delivery) => (
                            <DeliveryUserCard key={delivery.deliveryId} delivery={delivery} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h1>No deliveries found</h1>
                    </div>
                )
            )}
            </div>
        </>
        
    )
}