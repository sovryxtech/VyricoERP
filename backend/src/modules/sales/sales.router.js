const express = require("express")
const router = express.Router()
const {
    getAllSales,
    getSpecificSale,
    addNewSale,
    deleteSale,
    updateSale
} = require("./sales.controller")

router.get('/', getAllSales)
router.get('/:id', getSpecificSale)
router.post("/", addNewSale)
router.delete("/:id", deleteSale)
router.patch("/:id", updateSale)

module.exports = router;