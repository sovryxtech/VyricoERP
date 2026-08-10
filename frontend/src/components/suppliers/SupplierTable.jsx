import SupplierRow from "./SupplierRow";

const SupplierTable = ({
    suppliers,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">Company</th>
                            <th className="text-left p-3">Contact Person</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Phone</th>
                            <th className="text-left p-3">Address</th>
                            <th className="text-left p-3">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {suppliers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center p-8 text-gray-500"
                                >
                                    No Suppliers Found
                                </td>

                            </tr>

                        ) : (

                            suppliers.map((supplier) => (

                                <SupplierRow
                                    key={supplier.id}
                                    supplier={supplier}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default SupplierTable;