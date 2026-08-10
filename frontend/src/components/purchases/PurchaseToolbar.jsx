const PurchaseToolbar = ({
    search,
    setSearch,
    onAdd,
}) => {

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <input
                type="text"
                placeholder="Search purchases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
                onClick={onAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
                + New Purchase
            </button>

        </div>

    );

};

export default PurchaseToolbar;