import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from "@/App.jsx";
import AuthProvider from "@/AuthProvider.jsx";
import Root from "@/routes/Root.jsx";
import Login from "@/routes/Login.jsx";
import ErrorPage from "@/ErrorPage.jsx";
import { BrowserRouter as Router, Route, Routes , RouterProvider, createBrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>              
          <AuthProvider>
            <Routes>

                  <Route path="/" element={<Root />}>
                      <Route index element={<Root />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="*" element={<ErrorPage />} />
                  </Route>
              
            </Routes>
          </AuthProvider>
      </Router>
  </StrictMode>,
)

 
