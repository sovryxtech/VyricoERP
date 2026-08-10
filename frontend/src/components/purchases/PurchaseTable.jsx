import PurchaseRow from "./PurchaseRow";

const PurchaseTable = ({
    purchases,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-3">Invoice</th>

                        <th className="text-left p-3">Supplier</th>

                        <th className="text-left p-3">Date</th>

                        <th className="text-left p-3">Total</th>

                        <th className="text-left p-3">Status</th>

                        <th className="text-left p-3">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {purchases.length === 0 ? (

                        <tr>

                            <td
                                colSpan={6}
                                className="text-center py-10"
                            >
                                No Purchases Found
                            </td>

                        </tr>

                    ) : (

                        purchases.map((purchase) => (

                            <PurchaseRow
                                key={purchase.id}
                                purchase={purchase}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default PurchaseTable;