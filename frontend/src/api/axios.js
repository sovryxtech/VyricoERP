import axios from 'axios';

//axios instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

// axios request inceptors
// Automatically attach JWT.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (err) => Promise.reject(err)
)


// axios response inceptor
// Automatically logout on expired token.
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // optional
            // window.location.href="/login";
        }

        return Promise.reject(error);
    }
);


export default api;