import api from "../api/axios"

// ===============================
// GET ALL SALES
// ===============================

export const getSales = async (search = "") => {

    const response = await api.get("/sales", {
        params: {
            search,
        },
    });

    return response.data;

};

// ===============================
// GET SINGLE SALE
// ===============================

export const getSale = async (id) => {

    const response = await api.get(`/sales/${id}`);

    return response.data;

};

// ===============================
// CREATE SALE
// ===============================

export const createSale = async (data) => {

    const response = await api.post("/sales", data);

    return response.data;

};

// ===============================
// UPDATE SALE
// ===============================

export const updateSale = async (id, data) => {

    const response = await api.patch(`/sales/${id}`, data);

    return response.data;

};

// ===============================
// DELETE SALE
// ===============================

export const deleteSale = async (id) => {

    const response = await api.delete(`/sales/${id}`);

    return response.data;

};