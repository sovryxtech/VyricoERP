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
const customerRoute = require("./modules/customers/customers.routes")
const supplierRoute = require("./modules/suppliers/supplier.route")
const purchaseRoute = require("./modules/purchases/purchases.routes")
const salesRoute = require("./modules/sales/sales.router")
const dashboardRoute = require("./modules/dashboard/dashboard.routes")

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/products", productRoute)
app.use("/customers", customerRoute)
app.use("/suppliers", supplierRoute)
app.use("/purchases", purchaseRoute)
app.use("/sales", salesRoute);
app.use("/dashboard", dashboardRoute);

app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});