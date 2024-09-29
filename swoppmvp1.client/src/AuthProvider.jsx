import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
 
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    
    const isLoggedIn = () => {
        if(user === null){
            navigate("/login");
            return false;
        }  
        return true;
    }
    const loginAction = async (data)=> {
        console.log(data.toString())
        try {
            const response = await fetch("/Account/Login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            if(res.data){
                setUser(res.data.Username);
                setToken(res.data.Token);
                localStorage.setItem("site", res.token);
                navigate("/home");
                return;
            }
            throw new Error("Login failed");
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };
    return <AuthContext.Provider value={{ token, user, loginAction, logOut, isLoggedIn}}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    console.log("In useAuth")
    return useContext(AuthContext);
};