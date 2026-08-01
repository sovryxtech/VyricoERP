

// // import { FaHome, FaUser, FaSignOutAlt, FaCode, FaProjectDiagram } from "react-icons/fa";
// import { useNavigate } from "react-router";
// import { useState, useEffect } from "react"

// import Sidebar from "../components/Dashboard/Sidebar";
// import Navbar from "../components/Dashboard/Navbar";
// import StatCard from "../components/Dashboard/StatCard";
// import RecentActivity from "../components/Dashboard/RecentActivity";


// // business layers
// import { clearAuth, isAuthenticated } from "../utils/authStorage"
// import { getProfile, logout } from "../services/authService"

// const Dashboard = () => {
//     const navigate = useNavigate()

//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")

//     useEffect(() => {
//         const fetchProfile = async () => {
//             if (!isAuthenticated) {
//                 navigate("/login")
//                 return;
//             }

//             try {
//                 const data = await getProfile()
//                 setUser(data.user);
//             } catch (error) {
//                 setError(
//                     error.response?.data?.message || "Failed to load profile"
//                 )
//                 clearAuth()
//                 navigate("/login")
//             } finally {
//                 setLoading(false)
//             }
//         };
//         fetchProfile()

//     }, [navigate,])

//     const handleLogout = () => {
//         logout()
//         navigate("/login")
//     }

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <h2 className="text-xl font-semibold">
//                     Loading Dashboard...
//                 </h2>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <h2 className="text-red-500">{error}</h2>
//             </div>
//         );
//     }


//     return (
//         <div className="flex min-h-screen bg-gray-100">

//             <Sidebar onLogout={handleLogout} />

//             <div className="flex-1">

//                 <Navbar user={user} />

//                 <div className="p-8">

//                     <div className="mb-6">
//                         <h1 className="text-3xl font-bold">
//                             Welcome, {user?.name} 👋
//                         </h1>

//                         <p className="text-gray-500">
//                             {user?.email}
//                         </p>
//                     </div>

//                     <div className="grid gap-6 md:grid-cols-3">

//                         <StatCard
//                             title="Projects"
//                             value="12"
//                         />

//                         <StatCard
//                             title="Completed"
//                             value="84"
//                         />

//                         <StatCard
//                             title="Pending"
//                             value="7"
//                         />

//                     </div>

//                     <RecentActivity />

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Dashboard;
import { useEffect, useState } from "react";

import StatCard from "../components/Dashboard/StatCard";
import RecentSales from "../components/Dashboard/RecentSales";
import RecentPurchases from "../components/Dashboard/RecentPurchases";
import LowStock from "../components/Dashboard/LowStock";

import {
    getDashboardStats,
    getRecentSales,
    getRecentPurchases,
    getLowStockProducts
} from "../services/dashboardService";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [recentSales, setRecentSales] = useState([]);
    const [recentPurchases, setRecentPurchases] = useState([]);
    const [lowStock, setLowStock] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const [
                statsResponse,
                salesResponse,
                purchasesResponse,
                lowStockResponse
            ] = await Promise.all([
                getDashboardStats(),
                getRecentSales(),
                getRecentPurchases(),
                getLowStockProducts()
            ]);

            setStats(statsResponse.data);
            setRecentSales(salesResponse.data);
            setRecentPurchases(purchasesResponse.data);
            setLowStock(lowStockResponse.data);

        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.msg || "Failed to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <h2 className="text-xl font-semibold">
                    Loading Dashboard...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <h2 className="text-red-500 text-lg">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Overview of your business.
                </p>
            </div>

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Products"
                    value={stats.products}
                />

                <StatCard
                    title="Categories"
                    value={stats.categories}
                />

                <StatCard
                    title="Suppliers"
                    value={stats.suppliers}
                />

                <StatCard
                    title="Customers"
                    value={stats.customers}
                />

                <StatCard
                    title="Purchases"
                    value={stats.purchases}
                />

                <StatCard
                    title="Sales"
                    value={stats.sales}
                />

                <StatCard
                    title="Low Stock"
                    value={stats.low_stock}
                />

            </div>

            {/* Recent Sales */}

            <RecentSales sales={recentSales} />

            {/* Recent Purchases */}

            <RecentPurchases purchases={recentPurchases} />

            {/* Low Stock */}

            <LowStock products={lowStock} />

        </div>
    );
};

export default Dashboard;