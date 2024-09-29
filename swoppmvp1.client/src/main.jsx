import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "@/LoginForm.jsx";
import Navigation from "@/Navigation.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <div className="App">
              <Navigation />

              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="login" element={<LoginForm />} />
              </Routes> 
          </div>
      </BrowserRouter>
  </StrictMode>,
)
