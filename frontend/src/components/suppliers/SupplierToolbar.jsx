const SupplierToolbar = ({
    search,
    setSearch,
    onAdd,
}) => {

    return (

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            {/* Search */}

            <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-80 rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

            {/* Add Button */}

            <button
                onClick={onAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
                + Add Supplier
            </button>

        </div>

    );

};

export default SupplierToolbar;