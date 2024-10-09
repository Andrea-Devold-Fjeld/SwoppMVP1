import {setTransporterRole} from "@/hooks/AccountHooks.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function RegisterTransporter() {
    const navigate = useNavigate();
    setTransporterRole();
    navigate("/dashboard");

    return (
        <>
        </>
    )
}