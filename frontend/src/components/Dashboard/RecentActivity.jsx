const RecentActivity = () => {

    return (

        <div className="bg-white rounded-xl shadow mt-8 p-6">

            <h2 className="text-xl font-bold mb-5">

                Recent Activity

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Project
                        </th>

                        <th className="text-left">
                            Status
                        </th>

                        <th className="text-left">
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr className="border-b">

                        <td className="py-3">
                            Portfolio
                        </td>

                        <td className="text-green-600">
                            Completed
                        </td>

                        <td>
                            Today
                        </td>

                    </tr>

                    <tr className="border-b">

                        <td className="py-3">
                            Authentication
                        </td>

                        <td className="text-yellow-500">
                            In Progress
                        </td>

                        <td>
                            Yesterday
                        </td>

                    </tr>

                    <tr>

                        <td className="py-3">
                            Dashboard UI
                        </td>

                        <td className="text-blue-600">
                            Started
                        </td>

                        <td>
                            2 days ago
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

};

export default RecentActivity;