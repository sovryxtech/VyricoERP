const SaleItemRow = ({
    index,
    item,
    products,
    handleItemChange,
    removeItem,
    itemCount,
}) => {

    const total =
        Number(item.quantity || 0) *
        Number(item.selling_price || 0);

    return (

        <tr className="border-b">

            {/* Product */}

            <td className="p-3">

                <select
                    value={item.product_id}
                    onChange={(e) =>
                        handleItemChange(
                            index,
                            "product_id",
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                >

                    <option value="">

                        Select Product

                    </option>

                    {products.map((product) => (

                        <option
                            key={product.id}
                            value={product.id}
                        >

                            {product.name}

                        </option>

                    ))}

                </select>

            </td>

            {/* Quantity */}

            <td className="p-3">

                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                        handleItemChange(
                            index,
                            "quantity",
                            e.target.value
                        )
                    }
                    className="w-24 border rounded-lg px-3 py-2"
                    required
                />

            </td>

            {/* Selling Price */}

            <td className="p-3">

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.selling_price}
                    onChange={(e) =>
                        handleItemChange(
                            index,
                            "selling_price",
                            e.target.value
                        )
                    }
                    className="w-32 border rounded-lg px-3 py-2"
                    required
                />

            </td>

            {/* Row Total */}

            <td className="p-3 font-semibold">

                ₹ {total.toFixed(2)}

            </td>

            {/* Remove */}

            <td className="p-3">

                <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={itemCount === 1}
                    className="text-red-600 hover:text-red-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                >

                    Remove

                </button>

            </td>

        </tr>

    );

};

export default SaleItemRow;