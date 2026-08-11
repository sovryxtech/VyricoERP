const express = require("express");
const router = express.Router();

const {
    getInventory,
    getInventoryByID
} = require("./inventory.controller");


router.get("/", getInventory);
router.get("/:id", getInventoryByID);

module.exports = router