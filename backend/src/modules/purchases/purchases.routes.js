const express = require("express")
const router = express.Router();
const {
    getAllPurchases,
    getSpecificPurchase,
    addNewPurchase,
    deletePurchase,
    updatePurchase
} = require("./purchases.controller")

router.get("/", getAllPurchases)
router.get("/:id", getSpecificPurchase)
router.post("/", addNewPurchase)
router.delete("/:id", deletePurchase)
router.patch("/:id", updatePurchase)

module.exports = router;


