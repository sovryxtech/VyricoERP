import api from "../api/axios"


export const getDashboardStats = async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
};

export const getRecentSales = async () => {
    const response = await api.get("/dashboard/recent-sales");
    return response.data;
}


export const getRecentPurchases = async () => {
    const response = await api.get("/dashboard/recent-purchases");
    return response.data;
}

export const getLowStockProducts = async () => {
    const response = await api.get("/dashboard/low-stock");
    return response.data;
}