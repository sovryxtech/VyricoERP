const SupplierRow = ({
    supplier,
    onEdit,
    onDelete,
}) => {

    return (

        <tr className="border-b hover:bg-gray-50 transition">

            {/* Company */}

            <td className="p-3">

                <div>

                    <h3 className="font-semibold">

                        {supplier.company_name}

                    </h3>

                </div>

            </td>

            {/* Contact Person */}

            <td className="p-3">

                {supplier.contact_person}

            </td>

            {/* Email */}

            <td className="p-3">

                <span className="text-blue-600">

                    {supplier.email || "-"}

                </span>

            </td>

            {/* Phone */}

            <td className="p-3">

                {supplier.phone}

            </td>

            {/* Address */}

            <td className="p-3 max-w-xs">

                <p className="truncate">

                    {supplier.address || "-"}

                </p>

            </td>

            {/* Actions */}

            <td className="p-3 whitespace-nowrap">

                <button
                    onClick={() => onEdit(supplier)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(supplier)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button>

            </td>

        </tr>

    );

};

export default SupplierRow;