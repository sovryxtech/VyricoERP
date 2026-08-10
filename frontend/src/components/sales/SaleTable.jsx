import SaleRow from "./SaleRow";

const SaleTable = ({
    sales,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-3">

                            Invoice

                        </th>

                        <th className="text-left p-3">

                            Customer

                        </th>

                        <th className="text-left p-3">

                            Sale Date

                        </th>

                        <th className="text-left p-3">

                            Total

                        </th>

                        <th className="text-left p-3">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {sales.length === 0 ? (

                        <tr>

                            <td
                                colSpan={5}
                                className="text-center p-8"
                            >

                                No Sales Found

                            </td>

                        </tr>

                    ) : (

                        sales.map((sale) => (

                            <SaleRow
                                key={sale.id}
                                sale={sale}
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

export default SaleTable;