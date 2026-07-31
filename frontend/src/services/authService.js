import api from "../api/axios";

export const login = async (data) => {
    const response = await api.post("/user/login", data);
    return response.data;
};

export const signup = async (data) => {
    const response = await api.post("/user/signup", data);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/user/me",);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
