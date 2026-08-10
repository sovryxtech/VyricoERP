import api from "../api/axios";

// ============================
// GET /suppliers
// ============================

export const getSuppliers = async (search = "") => {
    const response = await api.get("/suppliers", {
        params: {
            search,
        },
    });

    return response.data;
};

// ============================
// GET /suppliers/:id
// ============================

export const getSupplier = async (id) => {
    const response = await api.get(`/suppliers/${id}`);

    return response.data;
};

// ============================
// POST /suppliers
// ============================

export const createSupplier = async (data) => {
    const response = await api.post("/suppliers", data);

    return response.data;
};

// ============================
// PATCH /suppliers/:id
// ============================

export const updateSupplier = async (id, data) => {
    const response = await api.patch(`/suppliers/${id}`, data);

    return response.data;
};

// ============================
// DELETE /suppliers/:id
// ============================

export const deleteSupplier = async (id) => {
    const response = await api.delete(`/suppliers/${id}`);

    return response.data;
};