import {useState, useEffect} from 'react'
import PacketComponent from "@/PacketComponent.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [packet, setPacket] = useState([])
    
    const auth = useAuth();
    console.log(auth.user);

    useEffect(() => {
        setLoading(true)
        fetch("/packet/getpackets", {
            method: "GET",
            header:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                setPacket(json);
            })
            .finally(() => setLoading(false));
    }, [packet]);
    console.log(packet);
    //console.log(packet);
    

    return (
        <div className={"table-responsive"}>
            {loading ?( <p>Loading...</p> ):(
            JSON.stringify(...packet))}
            </div>
            
    )
}

