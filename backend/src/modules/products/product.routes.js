const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getSpecificProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require("./product.controller")


router.get("/", getAllProducts);
router.get("/:id", getSpecificProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

module.exports = router;
