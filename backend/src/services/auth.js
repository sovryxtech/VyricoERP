const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

function setUser(userInfo) {

    // convert the payload into the required signatured token
    return jwt.sign(
        {
            id: userInfo.id,
            email: userInfo.email,
            name:userInfo.name,
            username:userInfo.username,
            avatar_url:userInfo.avatar_url,
            role:userInfo.role
        },
        secret_key,
        {
            expiresIn:"10d"
        }
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