import CustomerRow from "./CustomerRow";

const CustomerTable = ({
    customers,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">Full Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Phone</th>
                            <th className="text-left p-3">Address</th>
                            <th className="text-left p-3">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center p-8 text-gray-500"
                                >
                                    No Customers Found
                                </td>

                            </tr>

                        ) : (

                            customers.map((customer) => (

                                <CustomerRow
                                    key={customer.id}
                                    customer={customer}
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

export default CustomerTable;