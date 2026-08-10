import api from "../api/axios";

// GET /category
export const getCategories = async (search = "") => {
    const response = await api.get("/category", {
        params: {
            search,
        },
    });

    return response.data;
};

// GET /category/:id
export const getCategory = async (id) => {
    const response = await api.get(`/category/${id}`);
    return response.data;
};

// POST /category
export const createCategory = async (data) => {
    const response = await api.post("/category", data);
    return response.data;
};

// PATCH /category/:id
export const updateCategory = async (id, data) => {
    const response = await api.patch(`/category/${id}`, data);
    return response.data;
};

// DELETE /category/:id
export const deleteCategory = async (id) => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
};