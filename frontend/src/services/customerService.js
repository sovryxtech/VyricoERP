import api from "../api/axios";

// ============================
// GET /customers
// ============================

export const getCustomers = async (search = "") => {

    const response = await api.get("/customers", {
        params: {
            search,
        },
    });

    return response.data;

};

// ============================
// GET /customers/:id
// ============================

export const getCustomer = async (id) => {

    const response = await api.get(`/customers/${id}`);

    return response.data;

};

// ============================
// POST /customers
// ============================

export const createCustomer = async (data) => {

    const response = await api.post("/customers", data);

    return response.data;

};

// ============================
// PATCH /customers/:id
// ============================

export const updateCustomer = async (id, data) => {

    const response = await api.patch(`/customers/${id}`, data);

    return response.data;

};

// ============================
// DELETE /customers/:id
// ============================

export const deleteCustomer = async (id) => {

    const response = await api.delete(`/customers/${id}`);

    return response.data;

};