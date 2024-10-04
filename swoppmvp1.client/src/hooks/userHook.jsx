import {useAuth} from "@/hooks/AuthProvider.jsx";


export const getTransporerClaim = async () => {
    const param = new URLSearchParams();
    const auth = useAuth();
    const response = await fetch("account/getchecktransporterrole/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + auth.token,
            },
    }).then(res => res.json()
        .then(data => data.value));
    console.log("IN TRansporter: "+response);
    return response;
}
