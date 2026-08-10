import api from "../api/axios";

// Get all purchases
export const getPurchases = async (search = "") => {
    const response = await api.get(`/purchases?search=${search}`);
    return response.data;
};

// Get single purchase
export const getPurchase = async (id) => {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
};

// Create purchase
export const createPurchase = async (data) => {
    const response = await api.post("/purchases", data);
    return response.data;
};

// Update purchase
export const updatePurchase = async (id, data) => {
    const response = await api.patch(`/purchases/${id}`, data);
    return response.data;
};

// Delete purchase
export const deletePurchase = async (id) => {
    const response = await api.delete(`/purchases/${id}`);
    return response.data;
};