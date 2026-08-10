const ProductRow = ({
    product,
    onEdit,
    onDelete,
}) => {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-3">
                {product.sku}
            </td>

            <td className="p-3">
                <div>
                    <h3 className="font-semibold">
                        {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {product.description}
                    </p>
                </div>
            </td>

            <td className="p-3">
                {product.category}
            </td>

            <td className="p-3">
                ₹ {product.purchase_price}
            </td>

            <td className="p-3">
                ₹ {product.selling_price}
            </td>

            <td className="p-3">
                {product.stock_quantity}
            </td>

            <td className="p-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {product.is_active ? "Active" : "Inactive"}
                </span>
            </td>

            <td className="p-3">

                <button
                    onClick={() => onEdit(product)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(product)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button>

            </td>

        </tr>

    );

};

export default ProductRow;