const SaleToolbar = ({
    search,
    setSearch,
    onAdd,
}) => {

    return (

        <div className="flex justify-between items-center mb-6">

            <input
                type="text"
                placeholder="Search sales..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="w-80 px-4 py-2 border rounded-lg"
            />

            <button
                onClick={onAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >

                + New Sale

            </button>

        </div>

    );

};

export default SaleToolbar;