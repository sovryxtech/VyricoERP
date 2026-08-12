import axios from "../api/axios";


export const getInventory = async (params = {}) => {
    const response = await axios.get("/inventory", { params });

    return response.data;
};


export const getInventoryByid = async (id) => {
    const response = await axios.get(`/inventory/${id}`);
    return response.data;
}

