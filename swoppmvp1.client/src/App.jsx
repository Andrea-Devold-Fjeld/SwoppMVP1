import Root from "@/routes/Root.jsx";
import Login from "@/routes/Login.jsx";
import { Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {AuthLayout} from "@/Layout/AuthLayout.jsx";
import ProtectedLayout from "@/Layout/ProtectedLayout.jsx";
import Content from "@/routes/Content.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Register from "@/routes/Register.jsx";
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
import AddPacket from "@/routes/AddPacket.jsx";
import PackageReg from "@/routes/PackageReg.jsx";
import AllPackets from "@/routes/AllPackets.jsx";
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";
import RoutePlanner from "@/routes/RoutePlanner.jsx";
import Layout from "@/Layout/Layout.jsx";
import Logout from "@/routes/Logout.jsx";
import PacketTable from "@/tables/PacketTable.jsx";
import Packet from "@/routes/Packet.jsx";




export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            
            <Route element={<AuthLayout />}>
                <Route element={<Layout />} >
                    <Route path={""} element={<Content />} />
                    <Route path={"/"} element={<Content />} />
                    <Route path={"/home"} element={<Content />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path={"packet/:id"} element={<Packet />} />
                </Route>
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path={'/registerTransporter'} element={<RegisterTransporter />} />
                    <Route path={'/addPacket'} element={<AddPacket />} />
                    <Route path={'/PackageReg'} element={<PackageReg />} />
                    <Route path={'/allPackets'} element={<AllPackets />} />
                    <Route path={'/transporterRegistered'} element={<TransporterRegistered />} />
                    <Route path={'/routeplanner'} element={<RoutePlanner />} />
                    <Route path={'logout'} element={<Logout />} />
                </Route>
            </Route>


        </>
    )
)