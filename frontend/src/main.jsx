import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";

import './index.css'
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </StrictMode>,
)
