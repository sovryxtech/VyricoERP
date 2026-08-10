import PurchaseItemRow from "./PurchaseItemRow";

const PurchaseItemsTable = ({
    items,
    products,
    handleItemChange,
    addItem,
    removeItem,
}) => {

    return (

        <div>

            <div className="flex items-center justify-between mb-6">

                <h3 className="text-lg font-semibold">

                    Purchase Items

                </h3>

                <button
                    type="button"
                    onClick={addItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >

                    + Add Item

                </button>

            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">

                                Product

                            </th>

                            <th className="text-left p-3">

                                Quantity

                            </th>

                            <th className="text-left p-3">

                                Purchase Price

                            </th>

                            <th className="text-left p-3">

                                Total

                            </th>

                            <th className="text-center p-3">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center p-8 text-gray-500"
                                >

                                    No Items Added

                                </td>

                            </tr>

                        ) : (

                            items.map((item, index) => (

                                <PurchaseItemRow
                                    key={index}
                                    item={item}
                                    index={index}
                                    products={products}
                                    items={items}
                                    handleItemChange={handleItemChange}
                                    removeItem={removeItem}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <div className="mt-4 text-sm text-gray-500">

                Total Items : <strong>{items.length}</strong>

            </div>

        </div>

    );

};

export default PurchaseItemsTable;