const RecentSales = ({ sales = [] }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-5">
                Recent Sales
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="border-b">

                        <tr className="text-left text-gray-500">

                            <th className="pb-3">Invoice</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3 text-right">Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {sales.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No recent sales found.
                                </td>

                            </tr>

                        ) : (

                            sales.map((sale) => (

                                <tr
                                    key={sale.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >

                                    <td className="py-4">
                                        {sale.invoice_number}
                                    </td>

                                    <td>
                                        {sale.customer}
                                    </td>

                                    <td>
                                        {new Date(
                                            sale.sale_date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="text-right font-semibold">
                                        ₹ {sale.total_amount}
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

export default RecentSales;