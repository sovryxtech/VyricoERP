import axios from "../api/axios";

// GET REPORT SUMMARY

export const getReportSummary = async () => {

    const response = await axios.get(
        "/reports/summary"
    );

    return response.data;

};