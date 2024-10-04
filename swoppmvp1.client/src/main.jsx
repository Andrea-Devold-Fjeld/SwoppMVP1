import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {router} from "@/App.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from 'react-ui'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={"base"}>
          <RouterProvider router={router} />
      </ThemeProvider>
  </StrictMode>,
)

 
