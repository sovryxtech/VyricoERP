const CustomerRow = ({
    customer,
    onEdit,
    onDelete,
}) => {

    return (

        <tr className="border-b hover:bg-gray-50 transition">

            <td className="p-3">

                <h3 className="font-semibold">

                    {customer.full_name}

                </h3>

            </td>

            <td className="p-3">

                <span className="text-blue-600">

                    {customer.email || "-"}

                </span>

            </td>

            <td className="p-3">

                {customer.phone || "-"}

            </td>

            <td className="p-3 max-w-xs">

                <p className="truncate">

                    {customer.address || "-"}

                </p>

            </td>

            <td className="p-3 whitespace-nowrap">

                <button
                    onClick={() => onEdit(customer)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(customer)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button>

            </td>

        </tr>

    );

};

export default CustomerRow;