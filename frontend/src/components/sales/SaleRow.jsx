const SaleRow = ({
    sale,
    onEdit,
    onDelete,
}) => {

    return (

        <tr className="border-b hover:bg-gray-50">

            {/* Invoice */}

            <td className="p-3 font-medium">

                {sale.invoice_number}

            </td>

            {/* Customer */}

            <td className="p-3">

                {sale.customer}

            </td>

            {/* Sale Date */}

            <td className="p-3">

                {new Date(
                    sale.sale_date
                ).toLocaleDateString()}

            </td>

            {/* Total */}

            <td className="p-3 font-semibold">

                ₹ {sale.total_amount}

            </td>

            {/* Actions */}

            <td className="p-3">

                <button
                    onClick={() => onEdit(sale)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >

                    Edit

                </button>

                <button
                    onClick={() => onDelete(sale)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >

                    Delete

                </button>

            </td>

        </tr>

    );

};

export default SaleRow;