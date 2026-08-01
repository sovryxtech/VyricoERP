const ProductToolbar = ({
    search,
    setSearch,
    onAdd,
}) => {

    return (

        <div className="flex justify-between items-center mb-6">

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 w-80"
            />

            <button
                onClick={onAdd}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
            >
                + Add Product
            </button>

        </div>

    );

};

export default ProductToolbar;