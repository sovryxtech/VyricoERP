const PurchaseItemRow = ({
    item,
    index,
    products,
    items,
    handleItemChange,
    removeItem,
}) => {

    const total =
        Number(item.quantity || 0) *
        Number(item.purchase_price || 0);

    return (

        <tr className="border-t hover:bg-gray-50">

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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                >

                    <option value="">

                        Select Product

                    </option>

                    {products.map(product => (

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
                    className="w-24 rounded-lg border border-gray-300 px-3 py-2"
                    required
                />

            </td>

            {/* Purchase Price */}

            <td className="p-3">

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.purchase_price}
                    onChange={(e) =>
                        handleItemChange(
                            index,
                            "purchase_price",
                            e.target.value
                        )
                    }
                    className="w-36 rounded-lg border border-gray-300 px-3 py-2"
                    required
                />

            </td>

            {/* Total */}

            <td className="p-3 font-semibold">

                ₹ {total.toFixed(2)}

            </td>

            {/* Remove */}

            <td className="p-3 text-center">

                <button
                    type="button"
                    onClick={() =>
                        removeItem(index)
                    }
                    disabled={items.length === 1}
                    className={`px-3 py-1 rounded-md font-medium transition ${items.length === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                >

                    Remove

                </button>

            </td>

        </tr>

    );

};

export default PurchaseItemRow;