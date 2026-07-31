const express = require("express");
const router = express.Router();

const {
    getAllCustomers,
    getSpecificCustomer,
    addCustomer,
    deleteCustomer,
    updateCustomer
} = require("./customers.controller");

router.get("/", getAllCustomers);
router.get("/:id", getSpecificCustomer);
router.post("/", addCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;