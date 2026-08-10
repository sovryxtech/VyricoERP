import CategoryRow from "./CategoryRow";

const CategoryTable = ({
    categories,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">ID</th>

                        <th className="text-left p-4">
                            Category Name
                        </th>

                        <th className="text-left p-4">
                            Description
                        </th>

                        <th className="text-left p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {categories.length === 0 ? (

                        <tr>

                            <td
                                colSpan={4}
                                className="text-center p-10 text-gray-500"
                            >
                                No Categories Found
                            </td>

                        </tr>

                    ) : (

                        categories.map((category) => (

                            <CategoryRow
                                key={category.id}
                                category={category}
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

export default CategoryTable;