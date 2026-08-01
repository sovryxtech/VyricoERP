import ProductRow from "./ProductRow";

const ProductTable = ({
    products,
    onEdit,
    onDelete,
}) => {
    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-3">SKU</th>
                        <th className="text-left p-3">Product</th>
                        <th className="text-left p-3">Category</th>
                        <th className="text-left p-3">Purchase</th>
                        <th className="text-left p-3">Selling</th>
                        <th className="text-left p-3">Stock</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.length === 0 ? (

                        <tr>

                            <td
                                colSpan={8}
                                className="text-center p-8"
                            >
                                No Products Found
                            </td>

                        </tr>

                    ) : (

                        products.map(product => (

                            <ProductRow
                                key={product.id}
                                product={product}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default ProductTable;