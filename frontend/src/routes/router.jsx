// import { createBrowserRouter } from "react-router"
// import Signup from "../pages/Signup"
// import Login from "../pages/Login"
// import Dashboard from "../pages/Dashboard"

// const router = createBrowserRouter([
//     {
//         path: "/login",
//         element: <Login />
//     },
//     {
//         path: "/signup",
//         element: <Signup />
//     },
//     {
//         path: "/dashboard",
//         element: <Dashboard />
//     }
// ])

// export default router;



import { createBrowserRouter } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
// import Products from "../pages/Products";
// import Categories from "../pages/Categories";
// import Suppliers from "../pages/Suppliers";
// import Customers from "../pages/Customers";
// import Purchases from "../pages/Purchases";
// import Sales from "../pages/Sales";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        // children: [
        //     {
        //         path: "dashboard",
        //         element: <Dashboard />,
        //     },
        //     {
        //         path: "products",
        //         element: <Products />,
        //     },
        //     {
        //         path: "categories",
        //         element: <Categories />,
        //     },
        //     {
        //         path: "suppliers",
        //         element: <Suppliers />,
        //     },
        //     {
        //         path: "customers",
        //         element: <Customers />,
        //     },
        //     {
        //         path: "purchases",
        //         element: <Purchases />,
        //     },
        //     {
        //         path: "sales",
        //         element: <Sales />,
        //     },
        // ],
    },
]);

export default router;