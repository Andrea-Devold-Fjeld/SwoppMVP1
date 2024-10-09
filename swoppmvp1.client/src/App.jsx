import Root from "@/routes/Root.jsx";
import Login from "@/routes/Login.jsx";
import { Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {AuthLayout} from "@/Layout/AuthLayout.jsx";
import ProtectedLayout from "@/routes/ProtectedLayout.jsx";
import Content from "@/routes/Content.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Register from "@/routes/Register.jsx";
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route element={<Root />} >
                    <Route path={"/"} element={<Content />} />
                    <Route path={"/home"} element={<Content />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path={'/registerTransporter'} element={<RegisterTransporter />} />
                </Route>
            </Route>


        </>
    )
)