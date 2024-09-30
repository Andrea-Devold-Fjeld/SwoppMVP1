import {useAuth} from "@/hooks/AuthProvider.jsx";


export const getTransporerClaim = async (userId, loading) => {
    const param = new URLSearchParams();
    const auth = useAuth();
    if(!loading) {return null}
    const response = await fetch("account/getchecktransporterrole/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + auth.token,
            },
    });
    console.log("IN TRansporter: "+response);
    return await response.json();
}
