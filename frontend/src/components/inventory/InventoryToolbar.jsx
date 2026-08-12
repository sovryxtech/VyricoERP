const InventoryToolbar = ({
    search,
    setSearch,
    status,
    setStatus,
    onRefresh,
    loading
}) => {

    return (

        <div className="bg-white border rounded-lg p-4">

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

                {/* SEARCH */}

                <div className="flex-1">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search SKU, product or category..."
                        className="
                            w-full
                            px-4
                            py-2
                            border
                            border-gray-300
                            rounded-lg
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "
                    />

                </div>


                {/* STATUS FILTER */}

                <div>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="
                            w-full
                            md:w-44
                            px-4
                            py-2
                            border
                            border-gray-300
                            rounded-lg
                            bg-white
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="low-stock">
                            Low Stock
                        </option>

                        <option value="out-of-stock">
                            Out of Stock
                        </option>

                    </select>

                </div>


                {/* REFRESH */}

                <button
                    type="button"
                    onClick={onRefresh}
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

                    {loading ? "Refreshing..." : "Refresh"}

                </button>

            </div>

        </div>

    );

};


export default InventoryToolbar;

