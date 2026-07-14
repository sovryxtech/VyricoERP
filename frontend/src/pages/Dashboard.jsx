

// import { FaHome, FaUser, FaSignOutAlt, FaCode, FaProjectDiagram } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react"

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import StatCard from "../components/Dashboard/StatCard";
import RecentActivity from "../components/Dashboard/RecentActivity";


// business layers
import { clearAuth, isAuthenticated } from "../utils/authStorage"
import { getProfile, logout } from "../services/authService"

const Dashboard = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) {
                navigate("/login")
                return;
            }

            try {
                const data = await getProfile()
                setUser(data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message || "Failed to load profile"
                )
                clearAuth()
                navigate("/login")
            } finally {
                setLoading(false)
            }
        };
        fetchProfile()

    }, [navigate,])

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Dashboard...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-red-500">{error}</h2>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar onLogout={handleLogout} />

            <div className="flex-1">

                <Navbar user={user} />

                <div className="p-8">

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">
                            Welcome, {user?.name} 👋
                        </h1>

                        <p className="text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <StatCard
                            title="Projects"
                            value="12"
                        />

                        <StatCard
                            title="Completed"
                            value="84"
                        />

                        <StatCard
                            title="Pending"
                            value="7"
                        />

                    </div>

                    <RecentActivity />

                </div>

            </div>

        </div>
    );
};

export default Dashboard;