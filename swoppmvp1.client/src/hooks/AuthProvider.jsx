import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";

const AuthContext = createContext();
 
const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    
    const isLoggedIn = () => {
        if(user === ""){
            navigate("/home");
            return false;
        }  
        return true;
    }
    
    
    const loginAction = async (data)=> {
        console.log(data)
        console.log(JSON.stringify(data));
        
        try {
            const response = await fetch("/account/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            console.log(res);
            console.log(res.userId);
            console.log(res.token)
            
            if(!(res.userId === null)){
                console.log("USER 2:"+ res.userId +":" + res.userId.valueOf());
                setUser(res.userId);
                console.log("USER:" + user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                console.log(localStorage.getItem("user"));
                navigate("/profile");
                console.log("Successfully logged in: " + user + ":" +token +":"+ localStorage.getItem("site"));
                //return;
            }
            //throw new Error("Login failed");
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = () => {
        setUser("");
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };
    
    const contextValue = {}
    
    return <AuthContext.Provider value={{ user,token, loginAction, logOut, isLoggedIn}}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};