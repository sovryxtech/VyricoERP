const InventoryRow = ({ inventory }) => {

    const getStatusStyle = (status) => {

        switch (status) {

            case "In Stock":
                return "bg-green-100 text-green-700";

            case "Low Stock":
                return "bg-yellow-100 text-yellow-700";

            case "Out of Stock":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (

        <tr className="border-b hover:bg-gray-50 transition-colors">

            {/* SKU */}

            <td className="p-3 font-medium text-gray-800">

                {inventory.sku}

            </td>


            {/* PRODUCT */}

            <td className="p-3">

                <div>

                    <p className="font-medium text-gray-800">
                        {inventory.name}
                    </p>

                    {inventory.barcode && (

                        <p className="text-xs text-gray-500 mt-1">
                            Barcode: {inventory.barcode}
                        </p>

                    )}

                </div>

            </td>


            {/* CATEGORY */}

            <td className="p-3 text-gray-600">

                {inventory.category}

            </td>


            {/* STOCK */}

            <td className="p-3">

                <span className="font-medium text-gray-800">

                    {inventory.stock_quantity}

                </span>

                <span className="text-sm text-gray-500 ml-1">

                    {inventory.unit}

                </span>

            </td>


            {/* REORDER LEVEL */}

            <td className="p-3 text-gray-600">

                {inventory.reorder_level}

            </td>


            {/* PURCHASE PRICE */}

            <td className="p-3">

                ₹ {Number(inventory.purchase_price).toLocaleString("en-IN")}

            </td>


            {/* SELLING PRICE */}

            <td className="p-3">

                ₹ {Number(inventory.selling_price).toLocaleString("en-IN")}

            </td>


            {/* STOCK VALUE */}

            <td className="p-3 font-medium">

                ₹ {Number(inventory.stock_value).toLocaleString("en-IN")}

            </td>


            {/* STATUS */}

            <td className="p-3">

                <span
                    className={`px - 2 py - 1 rounded - full text - xs font - medium ${getStatusStyle(
                        inventory.status
                    )
                        }`}
                >

                    {inventory.status}

                </span>

            </td>

        </tr>

    );

};


export default InventoryRow;

