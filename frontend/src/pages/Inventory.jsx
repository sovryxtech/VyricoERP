import { useCallback, useEffect, useState } from "react";

import InventoryTable from "../components/inventory/InventoryTable";
import InventoryToolbar from "../components/inventory/InventoryToolbar";

import {
    getInventory
} from "../services/inventoryService";


const Inventory = () => {

    // ============================================
    // STATE
    // ============================================

    const [inventory, setInventory] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ============================================
    // FETCH INVENTORY
    // ============================================

    const fetchInventory = useCallback(
        async (searchValue = search, statusValue = status) => {

            try {

                setLoading(true);

                setError("");


                const params = {};


                // Add search only when provided

                if (
                    searchValue &&
                    searchValue.trim() !== ""
                ) {

                    params.search = searchValue.trim();

                }


                // Add status only when provided

                if (statusValue) {

                    params.status = statusValue;

                }


                const response = await getInventory(params);


                setInventory(
                    response?.data || []
                );


            } catch (error) {

                console.error(
                    "Fetch inventory error:",
                    error
                );


                setInventory([]);


                setError(
                    error?.response?.data?.msg ||
                    "Failed to load inventory"
                );


            } finally {

                setLoading(false);

            }

        },
        [search, status]
    );


    // ============================================
    // INITIAL LOAD + FILTER
    // ============================================

    useEffect(() => {

        const timeout = setTimeout(() => {

            fetchInventory();

        }, 300);


        return () => clearTimeout(timeout);

    }, [fetchInventory]);


    // ============================================
    // REFRESH
    // ============================================

    const handleRefresh = () => {

        fetchInventory();

    };


    // ============================================
    // RENDER
    // ============================================

    return (

        <div className="space-y-6">

            {/* PAGE HEADER */}

            <div>

                <h1 className="text-2xl font-bold text-gray-800">

                    Inventory

                </h1>

                <p className="text-sm text-gray-500 mt-1">

                    View and monitor your current product inventory.

                </p>

            </div>


            {/* TOOLBAR */}

            <InventoryToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                onRefresh={handleRefresh}
                loading={loading}
            />


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


            {/* INVENTORY COUNT */}

            <div className="text-sm text-gray-500">

                {loading
                    ? "Loading inventory..."
                    : `${inventory.length} inventory item${inventory.length === 1 ? "" : "s"} found`
                }

            </div>


            {/* TABLE */}

            <InventoryTable
                inventory={inventory}
                loading={loading}
            />

        </div>

    );

};


export default Inventory;

