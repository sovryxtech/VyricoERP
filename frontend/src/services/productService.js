import api from "../api/axios";

// GET /products
export const getProducts = async (search = "") => {
    const response = await api.get("/products", {
        params: {
            search,
        },
    });
    return response.data;
};

// GET /products/:id
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// POST /products
export const createProduct = async (data) => {
    const response = await api.post("/products", data);
    return response.data;
};

// PATCH /products/:id
export const updateProduct = async (id, data) => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
};

// DELETE /products/:id
export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};