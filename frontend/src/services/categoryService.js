// categoryService.js

import api from "../api/axios";

export const getCategories = async () => {
    const response = await api.get("/category");
    return response.data;
};