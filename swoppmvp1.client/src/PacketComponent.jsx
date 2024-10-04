import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useEffect, useState} from "react";
export default function PacketComponent(packet) {
    console.log(packet);
    let table;
    if(packet && packet.length) {
        table = packet.map((p) => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.id}</td>
                <td>{p.message}</td>
            </tr>
        ));
    }else {
        table = "No packets"
    }
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Packet</th>
                    <th scope="col">Message</th>
                </tr>
                </thead>
                <tbody>
                {table}
                </tbody>
            </table>
        </>
    )
}