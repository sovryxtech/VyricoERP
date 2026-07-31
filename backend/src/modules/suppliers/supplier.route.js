const express = require("express")
const router = express.Router();
const {
    getAllSuppliers,
    getSpecificSupplier,
    addNewSupplier,
    deleteSupplier,
    updateSupplier
} = require("./supplier.controller");
// const { deleteCategory } = require("../categories/category.controller");


router.get("/", getAllSuppliers);
router.get("/:id", getSpecificSupplier);
router.post("/", addNewSupplier);
router.delete("/:id", deleteSupplier);
router.patch("/:id", updateSupplier)


module.exports = router