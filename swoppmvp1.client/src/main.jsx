import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import LoginForm from "@/LoginForm.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode> 
      <Router>
          <Routes>
     
              <Route path="/" component={App} />
              <Route path={"/login"} element={<LoginForm />} />
          </Routes>
      </Router>
    <App />
  </StrictMode>,
)
