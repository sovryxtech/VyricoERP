const express = require("express");
const router = express.Router();
const {
    getAllCategory,
    getSpecificCategory,
    addCategory,
    deleteCategory,
    updateCategory
} = require("./category.controller")

router.get("/", getAllCategory)
router.get("/:id", getSpecificCategory)
router.post("/", addCategory)
router.delete("/:id", deleteCategory)
router.patch("/:id", updateCategory)

module.exports = router;