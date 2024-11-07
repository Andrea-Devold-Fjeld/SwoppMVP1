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
    try {
        const response = await fetch("/account/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(user)
        })
        const res =  await response.json();
        
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
export const checkTransporterRole = async () => {
    const navigate = useNavigate();
    const auth = useAuth();
    try {
        const response = await fetch("/account/checktransporterrole", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
        const res = await response.json();
        return res.type === "Transporter" && res.value === "true";
    }
    catch(err){
        console.log(err);
        navigate("/login");
    }

}
/**
 * Set transporterrole for a use returns true if success and false if not
 * @returns {Promise<void>}
 */
export const setTransporterRole = async () => {
    const auth = useAuth();

    try {
        const response = await fetch("/account/settransporterrole", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${auth.token}`
            }
        })
    }catch (e) {
        console.log(e);
    }
}