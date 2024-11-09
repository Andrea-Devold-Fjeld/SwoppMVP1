import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {router} from "@/App.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from 'react-ui'
import 'bootstrap/dist/css/bootstrap.css';
import { CookiesProvider } from 'react-cookie';


//removed strict mode
createRoot(document.getElementById('root')).render(
      <ThemeProvider theme={"base"}>
          <StrictMode>
            <CookiesProvider>
                <RouterProvider router={router} />
            </CookiesProvider>
          </StrictMode>
      </ThemeProvider>
  ,
)

 
