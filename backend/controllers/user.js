const User = require("../models/user")
const { setUser } = require("../services/auth")


async function login(req, res) {
    try {
        const { userName, email, password } = req.body;
        if ((!userName && !email) || !password) {
            return res.status(400).json({
                status: "error",
                msg: "Username or Email and Password are required"
            });
        }

        const query = userName ? { userName, password } : { email, password };
        const user = await User.findOne(query)

        if (!user) {
            return res.status(401).json({
                status: "error",
                msg: "Invalid Credentials"
            })
        }

        const token = setUser(user)
        return res.status(200).json({
            token,
            status: "success",
            msg: "Login Successful",
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }

}

async function signup(req, res) {

    try {


        const { name, userName, email, password } = req.body;
        // validate user input
        if (!name || !userName || !email || !password) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required"
            });
        }

        // check if username already exists
        const existingUsername = await User.findOne({ userName });
        if (existingUsername) {
            return res.status(400).json({
                status: "error",
                msg: "username already exists"
            })
        }

        // check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                status: "error",
                msg: "email already exists"
            })
        }


        // create user
        const user = await User.create({
            name,
            userName,
            email,
            password
        })

        const token = setUser(user);
        return res.status(200).json({
            token,
            status: "success",
            msg: "User Registered Successfully",
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }
}



module.exports = {
    login,
    signup
}