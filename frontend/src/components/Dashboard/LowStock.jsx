const LowStock = ({ products = [] }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-5">
                Low Stock Products
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="border-b">

                        <tr className="text-left text-gray-500">

                            <th className="pb-3">Product</th>
                            <th className="pb-3">Stock</th>
                            <th className="pb-3">Reorder Level</th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No low-stock products.
                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >

                                    <td className="py-4">
                                        {product.name}
                                    </td>

                                    <td className="font-semibold text-red-500">
                                        {product.stock_quantity}
                                    </td>

                                    <td>
                                        {product.reorder_level}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default LowStock;