const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getRecentSales,
    getRecentPurchases,
    getLowStockProducts
} = require("./dashboard.controller");

router.get("/stats", getDashboardStats);

router.get("/recent-sales", getRecentSales);

router.get("/recent-purchases", getRecentPurchases);

router.get("/low-stock", getLowStockProducts);

module.exports = router;