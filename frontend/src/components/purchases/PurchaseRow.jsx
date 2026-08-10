const PurchaseRow = ({
    purchase,
    onEdit,
    onDelete,
}) => {

    return (

        <tr className="border-b hover:bg-gray-50">

            {/* Invoice */}

            <td className="p-3 font-medium">

                {purchase.invoice_number}

            </td>

            {/* Supplier */}

            <td className="p-3">

                {purchase.supplier}

            </td>

            {/* Purchase Date */}

            <td className="p-3">

                {new Date(
                    purchase.purchase_date
                ).toLocaleDateString()}

            </td>

            {/* Total */}

            <td className="p-3 font-semibold">

                ₹ {purchase.total_amount}

            </td>

            {/* Status */}

            <td className="p-3">

                {purchase.status ? (

                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${purchase.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : purchase.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                    >
                        {purchase.status}
                    </span>

                ) : (

                    <span className="text-gray-400">

                        N/A

                    </span>

                )}

            </td>

            {/* Actions */}

            <td className="p-3">

                <button
                    onClick={() => onEdit(purchase)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(purchase)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button>

            </td>

        </tr>

    );

};

export default PurchaseRow;