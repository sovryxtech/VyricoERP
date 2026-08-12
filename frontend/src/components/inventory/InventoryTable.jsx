import InventoryRow from "./InventoryRow";


const InventoryTable = ({
    inventory,
    loading
}) => {


    // ============================================
    // LOADING STATE
    // ============================================

    if (loading) {

        return (

            <div className="bg-white rounded-lg border">

                <div className="p-8 text-center text-gray-500">

                    Loading inventory...

                </div>

            </div>

        );

    }


    // ============================================
    // EMPTY STATE
    // ============================================

    if (!inventory || inventory.length === 0) {

        return (

            <div className="bg-white rounded-lg border">

                <div className="p-8 text-center">

                    <p className="text-gray-500">

                        No inventory items found.

                    </p>

                </div>

            </div>

        );

    }


    // ============================================
    // TABLE
    // ============================================

    return (

        <div className="bg-white rounded-lg border overflow-x-auto">

            <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b">

                    <tr>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            SKU
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Product
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Category
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Stock
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Reorder Level
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Purchase Price
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Selling Price
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Stock Value
                        </th>

                        <th className="p-3 text-left font-semibold text-gray-700">
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {inventory.map((item) => (

                        <InventoryRow
                            key={item.id}
                            inventory={item}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

};


export default InventoryTable;

