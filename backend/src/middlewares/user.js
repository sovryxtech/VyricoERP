const auth = require("../services/auth");
const { getUser } = require("../services/auth")


// flexible middleware
function checkAuth(req, res, next) {
    const authHeader = req.headers["authorzation"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next();
    }

    const token = authHeader.split("Bearer ")[1];
    const user = getUser(token)

    if (user) {
        req.user = user;
    }

    next()
}


// very secure and restricted middleware
function restrictToLoggedInUserOnly(req, res, next) {

    // If checkAuth() has already authenticated the user
    if (req.user) {
        return next();
    }

    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "error",
            msg: "Authentication required. Please login."
        });
    }

    const token = authHeader.split(" ")[1];

    const user = getUser(token);

    if (!user) {
        return res.status(401).json({
            status: "error",
            msg: "Invalid or Expired Token"
        });
    }

    req.user = user;

    next();
}


module.exports = {
    checkAuth,
    restrictToLoggedInUserOnly
}