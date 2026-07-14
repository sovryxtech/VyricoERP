import { createBrowserRouter } from "react-router"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
])

export default router;