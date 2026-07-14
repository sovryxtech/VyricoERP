// utility services to handle token

export const saveAuth = ({ token, user }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const getUser = () => {
    const userString = localStorage.getItem("user")
    return JSON.parse(userString)
}

export const clearAuth = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}


export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};