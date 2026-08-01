const RecentPurchases = ({ purchases = [] }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-5">
                Recent Purchases
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="border-b">

                        <tr className="text-left text-gray-500">

                            <th className="pb-3">Invoice</th>
                            <th className="pb-3">Supplier</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3 text-right">Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {purchases.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No recent purchases found.
                                </td>

                            </tr>

                        ) : (

                            purchases.map((purchase) => (

                                <tr
                                    key={purchase.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >

                                    <td className="py-4">
                                        {purchase.invoice_number}
                                    </td>

                                    <td>
                                        {purchase.supplier}
                                    </td>

                                    <td>
                                        {new Date(
                                            purchase.purchase_date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="text-right font-semibold">
                                        ₹ {purchase.total_amount}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default RecentPurchases;