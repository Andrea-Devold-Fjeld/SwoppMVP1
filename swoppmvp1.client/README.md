# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Andrea explanation authprovider with router.

#### Main.jsx

    import {router} from "@/App.jsx";
    import {  RouterProvider} from "react-router-dom";
    import { ThemeProvider } from 'react-ui'
    
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <ThemeProvider theme={"base"}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </StrictMode>,
    )

ThemeProvider is not necessary it is only to set the theme.
RouterProvider is imported from App,jsx and is the function that routes the 
whole app so that you can use navigate("/url")

#### App.jsx
In this function it is two important things.
 - AuthLayout is the parent component of all the routes so that the AuthProvider with the hook useAuth can be used in the whole app.
 - And that there are two main routes.
   - ("/") which are the home which does not need the user to be logged in
   - ("/protectedlayout") that have a chck if the user is logged in
 

       import Root from "@/routes/Root.jsx";
       import Login from "@/routes/Login.jsx";
       import { Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
       import {AuthLayout} from "@/AuthLayout.jsx";
       import ProtectedLayout from "@/routes/ProtectedLayout.jsx";
       import Content from "@/Content.jsx";
       import Dashboard from "@/routes/Dashboard.jsx";
       import Profile from "@/routes/Profile.jsx";
    
        export const router = createBrowserRouter(
        createRoutesFromElements(
            <>  //Notice that AuthLayout is the parent element of the rest of the app
                <Route element={<AuthLayout />}>
                    //This first route is the routes that dont have to be authorized
                    <Route element={<Root />} >
                        <Route path={"/"} element={<Content />} />
                        <Route path={"/home"} element={<Content />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    //this are the route that needs to be authorized
                    <Route element={<ProtectedLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>
            </>
            )
        )

#### ProtectedLaytout.jsx
    export default function ProtectedLayout() {
        const user = useAuth();
        //notice the check if user is logged in and if not route them to login page
        if(!user.token) return <Navigate to="/login" />;
        return (
        <div>
            <div className={"nav"}>
                <Navigation />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
        )
    }

#### AuthProvider.jsx
    import { useContext, createContext, useState } from "react";
    import { useNavigate } from "react-router-dom";
    
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
                
                if(!(res.userId === null)){
                    setUser(res.userId);
                    setToken(res.token);
                    localStorage.setItem("site", res.token);
                    navigate("/profile");
                    console.log("Successfully logged in: " + user + ":" +token +":"+ localStorage.getItem("site"));
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
        
        return <AuthContext.Provider value={{ user,token, loginAction, logOut, isLoggedIn}}>
            {children}
        </AuthContext.Provider>;
    };
    
    export default AuthProvider;
    
    export const useAuth = () => {
    return useContext(AuthContext);
    };

#### Example of a get request with the token as a header.
Here you see that i send with the header Authorization with the useAuth to get the token.
When you send the token like this the backend can use this to find the userId.

      export const getTransporerClaim = async () => {
         const auth = useAuth();
         const response = await fetch("account/getchecktransporterrole/", {
            method: "GET",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + auth.token,
            },
            }).then(res => res.json()
            .then(data => data.value));
         return response;
      }

#### Example of post request

      const response = await fetch("/packets/addpacket", {
         method: "POST",
         headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + auth.token,
         },
         body: JSON.stringify(data)
         });
      const res = await response.json();

### Important how vite routes to the backend.
For the frontend to find the backend you have to add the endpoint to the
vite.config.js like this:

      server: {
         proxy: {
            '^/weatherforecast': {
               target,
               secure: false
            },
            '^/account/login': {
               target,
               secure: false
            },
            '^/packet/getpackets': {
               target,
               secure: false
            },
            '^/account/getchecktransporterrole': {
               target,
               secure: false
            },
            '^/packet/getpacketsbyuserid': {
               target,
               secure: false
            }
         },
         port: 5173,
         https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
         }
