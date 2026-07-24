require("dotenv").config();
const express = require("express");
const PORT = process.env.BACKEND_PORT;
const cors = require("cors");


const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());

const userRoute = require("./routes/user"); // /user
const categoryRoute = require("./modules/categories/category.routes") 
const productRoute = require("./modules/products/product.routes")

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute)


app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});