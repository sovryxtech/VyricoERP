import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";

import { clearAuth, isAuthenticated } from "../utils/authStorage";
import { getProfile, logout } from "../services/authService";

const DashboardLayout = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated()) {
                navigate("/login");
                return;
            }

            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (error) {
                setError(
                    error.response?.data?.msg || "Failed to load profile"
                );
                clearAuth();
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) { }

        clearAuth();
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading Dashboard...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-red-500">
                    {error}
                </h1>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Dashboard Lauout */}
            <Sidebar onLogout={handleLogout} />

            <div className="flex-1 flex flex-col">
                <Navbar user={user} />

                <main className="flex-1 p-8 overflow-auto">
                    <Outlet context={{ user }} />
                    
                    
                </main>
            </div>
            {/* Dashboard Layout */}
        </div>
    );
};


export default DashboardLayout;