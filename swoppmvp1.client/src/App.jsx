import AuthProvider, {useAuth} from "@/AuthProvider.jsx";
import Navigation from "@/Navigation.jsx";
import Root from "@/routes/Root.jsx";
import Login from "@/routes/Login.jsx";
import { BrowserRouter as Router, Route, Routes , RouterProvider, createBrowserRouter} from "react-router-dom";
import ErrorPage from "@/ErrorPage.jsx";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
const App = () => {
    
    return (
        <Router>
                <Routes>
                    <AuthProvider>
                        <Route path="/" element={<Root />}>
                            <Route index element={<Root />} />
                            <Route path="login" element={<Login />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </AuthProvider>
                </Routes>
            
        </Router>
    )
  
}
export default App;