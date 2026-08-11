const express = require("express");

const {
    getReportSummary
} = require("./reports.controller");


const router = express.Router();


router.get(
    "/summary",
    getReportSummary
);



module.exports = router;