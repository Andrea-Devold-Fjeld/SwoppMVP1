import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useEffect, useState} from "react";
export default function PacketComponent({packet}) {
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
                {packet.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.id}</td>
                        <td>{p.message}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}