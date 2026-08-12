import { useCallback, useEffect, useState } from "react";

import SummarySection from "../components/reports/SummarySection";

import {
    getReportSummary
} from "../services/reportService";


const Reports = () => {

    // ============================================
    // STATE
    // ============================================

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ============================================
    // FETCH SUMMARY
    // ============================================

    const fetchSummary = useCallback(async () => {

        try {

            setLoading(true);

            setError("");


            const response = await getReportSummary();


            setSummary(
                response?.data || null
            );


        } catch (error) {

            console.error(
                "Fetch report summary error:",
                error
            );


            setSummary(null);


            setError(
                error?.response?.data?.msg ||
                "Failed to load report summary"
            );


        } finally {

            setLoading(false);

        }

    }, []);


    // ============================================
    // INITIAL LOAD
    // ============================================

    useEffect(() => {

        fetchSummary();

    }, [fetchSummary]);


    // ============================================
    // REFRESH
    // ============================================

    const handleRefresh = () => {

        fetchSummary();

    };


    // ============================================
    // RENDER
    // ============================================

    return (

        <div className="space-y-6">

            {/* PAGE HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800">

                        Reports

                    </h1>

                    <p className="text-sm text-gray-500 mt-1">

                        View an overview of your business performance.

                    </p>

                </div>


                {/* REFRESH BUTTON */}

                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="
                        px-4
                        py-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        font-medium
                        hover:bg-blue-700
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                    "
                >

                    {loading
                        ? "Refreshing..."
                        : "Refresh"
                    }

                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="
                    bg-red-50
                    border
                    border-red-200
                    text-red-700
                    px-4
                    py-3
                    rounded-lg
                ">

                    {error}

                </div>

            )}


            {/* LOADING */}

            {loading && !summary && (

                <div className="
                    bg-white
                    border
                    rounded-xl
                    p-8
                    text-center
                    text-gray-500
                ">

                    Loading reports...

                </div>

            )}


            {/* SUMMARY */}

            {!loading && summary && (

                <SummarySection
                    summary={summary}
                />

            )}


            {/* EMPTY STATE */}

            {!loading && !summary && !error && (

                <div className="
                    bg-white
                    border
                    rounded-xl
                    p-8
                    text-center
                ">

                    <p className="text-gray-500">

                        No report data available.

                    </p>

                </div>

            )}

        </div>

    );

};


export default Reports;