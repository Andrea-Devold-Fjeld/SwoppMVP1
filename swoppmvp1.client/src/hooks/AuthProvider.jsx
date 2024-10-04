import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children}) => {
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

        try {
            const response = await fetch("/account/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();

            if(!(res.userId === null)){
                setUser(res.userId);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/profile"); //this route dont exist
            }
            throw new Error("Login failed");
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

    return <AuthContext.Provider value={{ user,token, loginAction, logOut, isLoggedIn}}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};