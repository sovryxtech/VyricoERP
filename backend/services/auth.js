const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

function setUser(userInfo) {

    // convert the payload into the required signatured token
    return jwt.sign(
        {
            _id: userInfo._id,
            email: userInfo.email
        },
        secret_key
    );
}


function getUser(token) {
    try {
        return jwt.verify(token, secret_key)
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}