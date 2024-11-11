/*
user {
username: string
password: string (min 6 char, one number and one special char)
}
We can discuss if we want to save more
}

returns userId, username
 */
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

export const registerHooks = async (user) => {
    console.log(user)
    try {
        return await fetch("/account/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(user)
        });
        
        if(res === "Not succesfull"){
            throw new Error(res);
        }
        return res;
    }
    catch(err){
        console.log(err);
    }
}
/**
 * Check if user has claims as a transporter, use the logged in token to authorize
 * @returns {Promise<boolean>} returns true if user is validated as transporter
 */
export const checkTransporterRole = async (auth) => {
    const navigate = useNavigate();
    try {
        const response = await fetch("/transporter/checkTransporterRole", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        if(response.status === 401){
            console.log("401")
            await auth.refreshTokenAPI(auth.refreshToken);
            const refreshedResponse = await fetch(`/transporter/checkTransporterRole`, {
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
        }else if (response.status === 500){
            console.log("500")
            await auth.refreshTokenAPI(auth.refreshToken);
            const refreshedResponse = await fetch(`/transporter/checkTransporterRole`, {
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
        } else {
            console.log("Error in checking transporter role");
        }
    } catch (e) {
        console.log(e);
    }

}
/**
 * Set transporterrole for a use returns true if success and false if not /transporter/checkTransporterRole
 * @returns {Promise<void>}
 */
export const setTransporterRole = async (auth) => {

    try {
        const response = await fetch("/Transporter/setTransporterRole", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        if(response.status === 401){
            await auth.refreshTokenAPI(auth.refreshToken);
            const refreshedResponse = await fetch(`/Transporter/setTransporterRole`, {
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
            alert("Error in checking transporter role");
            console.log("Error in checking transporter role");
        }
    } catch (e) {
        console.log(e);
    }

}