import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children}) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const refreshTokenAPI =  () => {
        
        console.log("In refresh token");
        return fetch("/account/refresh", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({refreshToken: refreshToken})
        })
            .then((response) => {
                console.log("Response: ", response);
                localStorage.setItem("accessToken", "");
                localStorage.setItem("refreshToken", "");
                localStorage.setItem("expiresIn", "");
                if (response.status === 200) {
                    console.log("Token refreshed succesfully");
                    const status = response.status;
                    return response.json();
                }else if (response.status !== 200) {
                    console.log("Unauthorized");
                    setToken("");
                    localStorage.setItem("accessToken", "");
                    localStorage.setItem("refreshToken", "");
                    localStorage.setItem("expiresIn", "");
                    
                    navigate("/login");
                }}).then((data) => {
                const accessToken = data.accessToken;
                const refreshToken = data.refreshToken;
                const expiresIn = data.expiresIn;
                setToken(accessToken);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("expiresIn", expiresIn);
                console.log("Done setting, enjoy your event");
            })
            .catch((err) => {
                console.log("token refresh error: ", err);
            })
    };

    const isLoggedIn = () => {
        if(!login){
            navigate("/home");
            return false;
        }
        return true;
    }
  
    const loginAction = async (data)=> {
        console.log(data)
        try {
            await fetch("/account/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if(response.status === 200){
                    return response.json();
                } else if (response.status === 400) {
                    Alert("Username already exists");
                } else {
                    throw new Error("Login failed");
                }})
                .then(data => {
                    const accessToken = data.accessToken;
                    const refreshToken = data.refreshToken;
                    const expiresIn = data.expiresIn;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("expiresIn", expiresIn);
                    console.log("Done setting, enjoy your event");
                    console.log("Token: ", localStorage.getItem("accessToken"));
                    console.log("Refresh token: ", localStorage.getItem("refreshToken"));
                    console.log("Expires in: ", localStorage.getItem("expiresIn"));
                    setToken(accessToken);
                    setRefreshToken(refreshToken);
                    

                    setLogin(true);
                    navigate("/dashboard");
                })
                .catch(err => {
                    console.log(err);
                    localStorage.setItem("accessToken", "");
                });
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = () => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        localStorage.setItem("expiresIn","");
        console.log("Logged out");
        navigate("/login");
    };
    
    
    
    

    return <AuthContext.Provider value={{ user,token, loginAction, logOut, isLoggedIn, refreshTokenAPI, refreshToken}}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};