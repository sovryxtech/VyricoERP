
const { setUser } = require("../services/auth")
const pool = require("../config/db");

async function login(req, res) {
    try {
        // identifier = email || username
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({
                status: "error",
                msg: "Invalid Cridentals"
            });
        }

        const result = await pool.query(
            `
            SELECT * FROM users 
            WHERE 
            (username = $1 OR email = $1)
            AND
            password=$2`,
            [identifier, password]
        )
        
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                status: "error",
                msg: "Invalid Credentials"
            })
        }

        req.user = user;
        
        const token = setUser(user);

        return res.status(200).json({
            status: "success",
            msg: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url,
                created_at: user.created_at,
                updated_at: user.updated_at
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
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required"
            });
        }

        // check if username already exists
        // const existingUsername = await User.findOne({ userName });
        const existingUser = await pool.query(
            `
            SELECT id FROM
            users
            WHERE
            username = $1 OR email = $2
            `,
            [username, email]
        )

        // console.log('route clicked')
        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                status: "error",
                msg: "Username or email already exists"
            })
        }

        // insert user into db table
        const result = await pool.query(
            `
            INSERT INTO users
            (
                name,
                username,
                email,
                password
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING
                id,
                name,
                username,
                email,
                role,
                avatar_url,
                created_at,
                updated_at;
    `,
            [
                name,
                username,
                email,
                password
            ]
        );


        const user = result.rows[0];

        req.user = user;

        const token = setUser(user);

        return res.status(201).json({
            status: "success",
            msg: "User Registered Successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }
}



async function getUsers(req, res) {

    try {

        const result = await pool.query(`
            SELECT
                id,
                name,
                username,
                email,
                role,
                avatar_url,
                created_at,
                updated_at
            FROM users
            ORDER BY id
        `);

        return res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

// async function login(req, res) {
//     const { usernam, email, password } = req.body;
// }
module.exports = {
    getUsers,
    login,
    signup
};