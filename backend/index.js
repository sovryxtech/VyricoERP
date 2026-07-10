require("dotenv").config()
const express = require("express")
const app = express();
const PORT = process.env.BACKEND_PORT;


// routes
const userRoute = require("./routes/user")

// db resources
const { connectDB } = require("./connection")
const DB_URL = process.env.DB_URL;
connectDB(DB_URL)

// middleware resources
const {
    checkAuth,
    restrictToLoggedInUserOnly
} = require("./middlewares/user")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(checkAuth)


app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`sserver started at port ${PORT}`)
})