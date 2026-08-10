import SaleItemRow from "./SaleItemRow";

const SaleItemsTable = ({
    items,
    products,
    handleItemChange,
    addItem,
    removeItem,
}) => {

    return (

        <div>

            <div className="flex justify-between items-center mb-4">

                <h3 className="text-lg font-semibold">

                    Sale Items

                </h3>

                <button
                    type="button"
                    onClick={addItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    + Add Item
                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border rounded-lg overflow-hidden">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">

                                Product

                            </th>

                            <th className="text-left p-3">

                                Quantity

                            </th>

                            <th className="text-left p-3">

                                Selling Price

                            </th>

                            <th className="text-left p-3">

                                Total

                            </th>

                            <th className="text-left p-3">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item, index) => (

                            <SaleItemRow
                                key={index}
                                index={index}
                                item={item}
                                products={products}
                                handleItemChange={handleItemChange}
                                removeItem={removeItem}
                                itemCount={items.length}
                            />

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default SaleItemsTable;